import http from 'http'
import socketAPI from './socket-api.js'
import path from  'path'

// loading the environment varaiables
if (process.env.NODE_ENV !== 'production') {
    const dotenv = await import('dotenv')
    dotenv.config({
        "path": path.join(process.cwd(),'..','.env')
    })
}


// connecting to the datajbase
try {
    const {client} = await import("./dbClient.js")
    await client.connect()
    console.info("database connected")

} catch (error) {
    console.error(error)
    process.exit(1)
}


const app = await import('./app.js')
const server = http.createServer(app)

socketAPI(server).catch(err => {
    console.error(err)
    process.exit(1)
})


// starting the server
server.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})

