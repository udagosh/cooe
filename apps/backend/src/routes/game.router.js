import express from 'express'
import catchAsync from '../utils/catchAsync.js'
const gameRouter = express.Router()
import {emitter as gameEmitter} from '../game.js'


gameRouter.get('/stream',catchAsync(async (req,res) => {

    res.set({
        "cache-control": "no-cache",
        "content-type": "text/event-stream",
        "connection": "keeep-alive"
    })
    res.flushHeaders()

    res.write("retry: 1000\n\n")
    while (true){
        await new Promise(resolve => {
            gameEmitter.on('game',(msg) => {
                res.write(`data: ${msg}\n\n`)
            })

            gameEmitter.on('error', (err) => {
                resolve(err)
            })

            gameEmitter.on("exit", (code) => {
                resolve(code)
            })
        })
    }

}))

export default gameRouter