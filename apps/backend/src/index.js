import path from 'path'
import runGame from './game.js';

// loading the environment varaiables
if (process.env.NODE_ENV !== 'production') {
    const dotenv = await import('dotenv')
    dotenv.config({
        "path": path.join(process.cwd(), '.env')
    })
}

// connecting to the database
try {
    const {connect} = await import("./db-utils/dbClient.js")
    await connect()
} catch (error) {
    console.error(error)
    process.exit(1)
}

// starting the game
// runGame().catch(err => {
//     console.error(err)
//     process.exit(1)
// })

// starting the app
const {app} = await import('./app.js')
app.listen(process.env.PORT, () => {
    
    console.log(`listening on port ${process.env.PORT}`)
})
