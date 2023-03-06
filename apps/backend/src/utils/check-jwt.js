import * as jwt from 'express-jwt'
import jwksRsa from 'jwks-rsa'

console.log("audience", process.env.AUDIENCE)
console.log(`https://${process.env.ISSUER_BASE_URL}/.well-known/jwks.json`)
const checkJwt = jwt.expressjwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.ISSUER_BASE_URL}/.well-known/jwks.json`,
    }),

    audience: process.env.AUDIENCE,
    issuer: `https://${process.env.ISSUER_BASE_URL}/`,
    algorithms: ['RS256'],
});


export {checkJwt}
