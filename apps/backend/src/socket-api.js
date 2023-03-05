import {Server as SocketServer} from 'socket.io'
import jwksClient  from 'jwks-rsa'
import jwt from 'jsonwebtoken'
var io

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

function socketAPI(server){
    io = new SocketServer(server)
    io.on('connection',(socket) => {
        socket.on('')
    })
}

export default socketAPI

