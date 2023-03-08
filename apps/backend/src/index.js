// loading the environment varaiables
import runGame from './game.js';
import connect from './dbClient.js'
// connecting to the database

try {
    await connect()
} catch (error) {
    console.error(error)
    process.exit(1)
}


// starting the game
// error handling and restarting the game has to be placed here
// runGame().catch(err => {
//     console.error(err)
//     process.exit(1)
// })

// starting the app
const {app} = await import('./app.js')
app.listen(process.env.PORT, () => {
    
    console.log(`listening on port ${process.env.PORT}`)
})
