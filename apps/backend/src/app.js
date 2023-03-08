import express from 'express'
import cors from 'cors'
import methodOverride from 'method-override'
import userRouter from './routes/user.router.js'
import gameRouter from './routes/game.router.js'
import walletRouter from './routes/wallet.router.js'
import { auth } from "express-oauth2-jwt-bearer";
import getTimeStamp from './utils/timestamp.js'
import ExpressError from './utils/ExpressError.js'
const app = express()



// first check the client origin and headers
app.use(cors({
    "origin": ['http://localhost:3000']
}))


// then parse the payload and the method
app.use(express.json())
app.use(express.urlencoded({ "extended": false }))
app.use(methodOverride())

// logging
app.use((req, res, next) => {
    console.log(`${getTimeStamp()} ${req.method} ${req.url}`)
    next()
})


// authorize the token
// app.use(auth({
//     audience: process.env.AUDIENCE,
//     issuerBaseURL: process.env.ISSUER_BASE_URL,
//     tokenSigningAlg: 'RS256'
// }))

// app.use(checkJwt)
app.use("/wallet", walletRouter)
app.use("/user", userRouter)
app.use("/game", gameRouter)


app.all('*', next => {
    next(new ExpressError("PAGE NOT F   OUND", 404))
});



app.use((err, _, res, __) => {
    const { statusCode = 500, message = "Internal Server Error" } = err;
    res.status(statusCode).json({ 'error': message });
})






export { app };