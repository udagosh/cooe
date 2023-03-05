import { parentPort } from "node:worker_threads";

const SECOND = 1000;
const MINUTE = 60 * SECOND;

while (true) {

    await new Promise((resolve, reject) => {

        let s = 0;
        let m = 0;

        
        parentPort.postMessage(`issue: ${issues}`)
        let interval = setInterval(() => {
            try {
                if (m == 2 && s == 30) {
                    parentPort.postMessage('freeze')
                }
                parentPort.postMessage(`${m}:${s}`)
                s = (s + 1) % 60;
                if (s == 0) {
                    m = (m + 1) % 60
                }

            } catch (error) {
                reject(error)
            }
        }, SECOND);

        setTimeout(async () => {
            try {

                clearInterval(interval)
                parentPort.postMessage(`${m}:${s}`)
                parentPort.postMessage("contracts")

                // wait for parent reply before starting a new issue.
                await new Promise(resolve => {
                    parentPort.on("message", (msg) => {
                        resolve(msg)
                    })
                })

                // make a db request, to create the new issue and send the issue back to the parent
                issues = (issues + 1)%480


                resolve(issues)
            } catch (error) {
                reject(error)
            }
        }, 3 * MINUTE);
    })
}
