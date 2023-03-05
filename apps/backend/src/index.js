import path from 'path'
import runGame from './game.js';
import http from 'http'

// loading the environment varaiables
if (process.env.NODE_ENV !== 'production') {
    const dotenv = await import('dotenv')
    dotenv.config({
        "path": path.join(process.cwd(), '..', '.env')
    })
}




// connecting to the datajbase
try {
    const {connect} = await import('./dbClient.js')
    await connect()
    console.info("database connected")
} catch (error) {
    console.error(error)
    process.exit(1)
}

// starting the game
runGame().catch(err => {
    console.error(err)
    process.exit(1)
})

// starting the app
const app = await import('./app.js')
const server = http.createServer(app)

server.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})
