import http from 'http'
import app from './app'
import socketAPI from './socket-api'


// connecting to the database
try {
    const client = await import("./dbClient.js")
    await client.connect()
    console.info("database connected")
} catch (error) {
    console.error(error)
    process.exit(1)
}

// loading the environment varaiables

if (process.env.NODE_ENV !== 'production') {
    const dotenv = await import('dotenv')
    dotenv.config()
}

const server = http.createServer(app)
socketAPI(server)


// starting the server
server.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})

