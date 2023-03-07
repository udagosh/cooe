import {EventEmitter} from 'node:events'
const SECOND = 1000;
const MINUTE = 60 * SECOND;


const gameEmitter = new EventEmitter()

// this function starts the game
// game logic:
// 1. game runs in a while loop
// 2. each loop runs a single issue
// 3. each issue runs for 3 minutes
// 4. first 2:30, user can place any number of contracts
// 5. last 30 seconds, useer cannot place any more
// 6. before starting the next issue, result is revelead
// 7. once issue is completed, game processes all the contracts placed by all users
// 8. once completed processing the contracts, users are signaled to fetch his contracts and updated wallet balance
// 9. game waits for 10 seconds
// 10. then starts a next issue
// 11. before starting any issue, send issue details to the user


// user opens a event stream from browser, the route associated with the stream, will listen to gameEmitter,
// route will stream the game continously to user
// any message, game wants to send during the game, it will just emit the event and send the event

// any error ocuured during the game will terminate the entire game, which inturn terminate the processes itself.
// we can add logic to restart the game, if it terminates abruptly
// before restarting, we have to clean the database of all contracts which are alive
// we have to delete the last live issue from database
// then we can restart the game

// game has to be started in index.js file
// error handling logic has to be placed there
export default async function runGame(){
    console.info("starting the game")
    // get last issue count from the database 
    var issues = 0

    while (true) {
        await new Promise((resolve, reject) => {
            // two varables to track seconds and minutes
            let s = 0;
            let m = 0;
            
            // 
            gameEmitter.emit('game',JSON.stringify({
                "issue": issues
            }))

            // setting the interval to run for ever second
            let interval = setInterval(() => {
                try {
                    gameEmitter.emit("game", JSON.stringify({
                        "time": `${m}:${s}`
                    }))
                    s = (s + 1) % 60;
                    if (s == 0) {
                        m = (m + 1) % 60
                    }
                } catch (error) {
                    reject(error)
                }
            }, SECOND);

            // setting the timeout, which runs after 2 minutes, 30 seconds
            setTimeout(() => {
                gameEmitter.emit("game",JSON.stringify({
                    "status": "freeze"
                }))
            }, 2*MINUTE+30*SECOND);
    
            // setting the timeout, which runs after 3 minutes
            setTimeout(async () => {
                try {
    
                    clearInterval(interval)
                    gameEmitter.emit("game", JSON.stringify({
                        "time": `${m}:${s}`
                    }))
    
                    // an issue is is completed
                    // process all the contracts    
                    // make a db request, to create the new issue and send the issue back to the parent
                    issues = (issues + 1)%480
                    resolve(issues)
                } catch (error) {
                    reject(error)
                }
            }, 3 * MINUTE);
        })
    }
}

export {gameEmitter}
