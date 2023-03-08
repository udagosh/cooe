import { EventEmitter } from "node:events";
import { calculateResult, getLastIssue, newIssue, processContracts } from "./db-utils/game.util.js";
import ExpressError from "./utils/ExpressError.js";
import getTimeStamp from "./utils/timestamp.js";
const SECOND = 1000;
const MINUTE = 60 * SECOND;

const gameEmitter = new EventEmitter();




async function runEverySecond(gameEmitter, reject,minutes,seconds){
  try {
    gameEmitter.emit(
      "game",
      JSON.stringify({
        time: `${minutes}:${seconds}`,
      })
    );
    seconds = (seconds + 1) % 60;
    if (seconds == 0) {
      minutes = (minutes + 1) % 60;
    }
  } catch (error) {
    reject(error);
  }
}

async function runBeforeFreeze(gameEmitter) {
  gameEmitter.emit(
    "game",
    JSON.stringify({
      status: "freeze",
    })
  );

  // Algorithms to calculate the resultt will run here
  // Process all the placed contract.
  const {number, color} = await calculateResult(issueNumber)
  await processContracts(issueNumber,number, color)
  
}

async function runAfterInterval(gameEmitter,resolve,reject,minutes,seconds,interval,issueNumber) {
  try {
    clearInterval(interval);
    gameEmitter.emit(
      "game",
      JSON.stringify({
        time: `${minutes}:${seconds}`,
      })
    );
    // an issue is is completed
    // make a db request, to create the new issue and send the issue back to the parent
    issueNumber =await newIssue({
      "issue_number": issueNumber+1,
      "status": "open",
      "time_stamp": getTimeStamp(),
    })

    
    // We will send the result of the previous issue.
    // We will signal them to get the updated wallet balance and contracts are processed.
    resolve(issueNumber);
  } catch (error) {
    reject(error);
  }
}

export default async function runGame() {
  console.info("starting the game");
  // get last issue count from the database
  let issueNumber = await getLastIssue();
  if (issueNumber == null) {
    issueNumber = await newIssue({
      "issue_number": 1,
      "status": "open",
      "time_stamp": getTimeStamp(),
    })

    if (issueNumber == null) {
      throw new ExpressError()
    }
  }
  while (true) {
    await new Promise((resolve, reject) => {
      // two varables to track seconds and minutes
      let seconds = 0;
      let minutes = 0;
      gameEmitter.emit(
        "game",
        JSON.stringify({
          issueNumber: issueNumber,
        })
      );
      // setting the interval to run for every second
      let interval = setInterval(runEverySecond(gameEmitter,reject,minutes,seconds), SECOND);
      // setting the timeout, which runs after 2 minutes, 30 seconds
      setTimeout(runBeforeFreeze(gameEmitter), 2 * MINUTE + 30 * SECOND);
      // setting the timeout, which runs after 3 minutes
      setTimeout(runAfterInterval(gameEmitter,resolve,reject,minutes,seconds,interval,issueNumber), 3 * MINUTE);
    });
  }
}


export { gameEmitter };
