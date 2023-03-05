import { Server as SocketServer } from 'socket.io'

import { Worker } from "node:worker_threads";

const worker = new Worker('./game.js')





// import jwksClient  from 'jwks-rsa'
// import jwt from 'jsonwebtoken'
// const client = jwksClient({
//     jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
// })

// function getKey(header, cb){
//     client.getSigningKey(header.kid, function(err, key){
//         var signingKey = key.publicKey | key.rsaPublicKey
//         cb(null, signingKey)
//     })
// }

// function verify(token){
//     return new Promise((resolve,reject) => {

//         jwt.verify(token, getKey, {
//             algorithms: ['RS256'],
//             audience: process.env.AUTH0_AUDIENCE,
//             issuer: `https://${process.env.AUTH0_DOMAIN}/`
//         }, (err, decoded) => {
//             if (err) {
//                 reject(err)
//             } else{
//                 resolve(decoded)
//             }
//         })
//     })
// }

async function socketAPI(server) {
    try {
        const io = new SocketServer(server)
        io.on('connection', (socket) => {
            // storing the connection id

        })

        await new Promise((resolve, reject) => {

            worker.on('message', (msg) => {
                // we pass the message
                io.emit("game", JSON.stringify({
                    'time': msg,
                }))
            })

            worker.on('error', (err) => {
                reject(err)
            })

            worker.on('exit', (code) => {
                console.log(timings)
                console.log(timings.length)
                resolve(code)
            })
        })
    } catch (error) {
        throw error;
    }

}

export default socketAPI

