import {EventEmitter} from 'node:events'
const SECOND = 1000;
const MINUTE = 60 * SECOND;
var issues = 0

const emitter = new EventEmitter()

export default async function runGame(){
    console.info("starting the game")
    while (true) {
        await new Promise((resolve, reject) => {
            let s = 0;
            let m = 0;
            emitter.emit('game',JSON.stringify({
                "issue": issues
            }))
            let interval = setInterval(() => {
                try {
                    if (m == 2 && s == 30) {
                        emitter.emit("game",JSON.stringify({
                            "status": "freeze"
                        }))
                    }
    
    
                    emitter.emit("game", JSON.stringify({
                        "time": `${m}:${s}`
                    }))
                    
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
                    emitter.emit("game", JSON.stringify({
                        "time": `${m}:${s}`
                    }))
    
                    // an issue is is completed
                    // process all the contracts
    
                    // make a db request, to create the new issue and send the issue back to the parent
                    issues = (issues + 1)%480
                    resolve(issues)
                } catch (error) {
                    reject(error)
                }
            }, 3 * MINUTE);
        })
    }
}


export {emitter}