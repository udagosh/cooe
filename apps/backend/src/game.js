import { parentPort } from "node:worker_threads";

const SECOND = 1000;
const MINUTE = 60*SECOND;


function sleep(ms){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, ms);
    })
}


let s = 0;
let m = 0;

const interval = setInterval(async () => {
    parentPort.postMessage(`${m}:${s}`)
    s = (s+1)%60;
    if (s==0) {
        m = (m+1)%60
    }
}, SECOND);


setTimeout(() => {
    clearInterval(interval)
}, 3*MINUTE);
