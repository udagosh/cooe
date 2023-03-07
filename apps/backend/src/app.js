import express from 'express'
import cors from 'cors'
import methodOverride from 'method-override'
import userRouter from './routes/user.router.js'
import gameRouter from './routes/game.router.js'
import walletRouter from './routes/wallet.router.js'
import { auth } from "express-oauth2-jwt-bearer";
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
    const dt = new Date(Date.now())
    const date = dt.getDate()
    const month = dt.getMonth()
    const year = dt.getFullYear()
    const hours = dt.getHours()
    const minutes= dt.getMinutes()
    const seconds = dt.getSeconds()
    const stamp = `${date}/${month}/${year} ${hours}:${minutes}:${seconds}` 
    
    console.log(`${stamp} ${req.method} ${req.url}`)
    next()
})

// authorize
app.use(auth({
    audience: process.env.AUDIENCE,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
}))

// app.use(checkJwt)
app.use("/wallet", walletRouter)
app.use("/user", userRouter)
app.use("/game", gameRouter)


app.all('*', next => {
    next(new ExpressError("PAGE NOT FOUND", 404))
});



app.use((err, _, res, __) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).json({ 'error': message });
})






export { app };