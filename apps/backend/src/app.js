import express from 'express'
import cors from 'cors'
import methodOverride from 'method-override'
import userRouter from './routes/user.router.js'
import gameRouter from './routes/game.router.js'
import walletRouter from './routes/wallet.router.js'
import { checkJwt } from './utils/check-jwt.js'
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

// authorize
app.use(auth({
    audience: 'http://cooe.api',
    issuerBaseURL: 'https://dev-ewmrc8c2y6cijr6g.us.auth0.com/',
    tokenSigningAlg: 'RS256'
}))
app.use((req,res,next) => {
    console.log(req.headers['authorization'])
    next()
})
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