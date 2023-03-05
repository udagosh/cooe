import express from 'express'
import http from 'http'
import {auth} from 'express-oauth2-jwt-bearer'
import cors from 'cors'
import methodOverride from 'method-override'
import userRouter from './routes/user.router.js'
import dotenv from 'dotenv'



if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`
})


try {
    const client = await import("./dbClient.js")
    await client.connect()
    console.info("database connected")
} catch (error) {
    console.error(error)
    process.exit(1)
}

const app = express()
const server = http.createServer(app)

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
app.use(jwtCheck)

app.use("user", userRouter)

app.all('*', (_, _, next) => {
    next(new ExpressError("PAGE NOT FOUND", 404))
});



app.use((err, _, res, _) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render('error', { message });
})


server.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})
