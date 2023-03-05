import express from 'express'
import {auth} from 'express-oauth2-jwt-bearer'
import cors from 'cors'
import methodOverride from 'method-override'
import userRouter from './routes/user.router.js'


const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
    tokenSigningAlg: 'RS256'
})



const app = express()


// first check the client origin and headers
app.use(cors({
    "origin": process.env.CLIENT_ORIGIN,
    "methods": ['GET','POST','PUT'],
    "allowedHeaders": 'content-type,authorization',
    "credentials": true
}))

// then parse the payload and the method
app.use(express.json())
app.use(express.urlencoded())
app.use(methodOverride())

// authorize
app.use((req,res,next) => {
    console.info("Authorizing the request")
    jwtCheck(req,res,next)
})

app.use("user", userRouter)

app.all('*', (_, _, next) => {
    next(new ExpressError("PAGE NOT FOUND", 404))
});



app.use((err, _, res, _) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render('error', { message });
})




export default app;