import ExpressError from "../utils/ExpressError.js";
import { client } from "./dbClient.js";
import { issueSchema } from "./schemas";


/**
 * creates the new issue
 * 
 * @param issueObj
 * @returns "success" on succesful save
 * @throws "error" on failure
 */
export async function newIssue(issueObj) {
    const issue = issueSchema.parse(issueObj)
    const issueCollection = client.db("cooe").collection("issues")
    const isThereissue = (await issueCollection.findOne({
        "issue_number": issue.issue_number
    }))
    if (isThereissue) {
        throw new Error("issue is already defined")
    }
    if (issue.status == "offline") {
        throw new Error("isssue is offline")
    }
    if (issue.result) {
        throw new Error("result is already defined")
    }
    await issueCollection.insertOne(issueObj)

}

/**
 * 
 * update the status and result of the issue
 */
export async function updateIssue(issue_number, number, color) {
    const issueCollection = client.db("cooe").collection("issues")
    const result = await issueCollection.findOneAndUpdate({ "issue_number": issue_number }, {
        $set: { "number": number, "status": color }
    })

    if (result.value == null) {
        throw new Error("no issue found")
    }
}


/**
 * returns all completed issues
 */
export async function getAllIssues() {
    const issueCollection = client.db("cooe").collection("issues")
    const issues = await new Promise((resolve, reject) => {

        issueCollection.find({
            "status": "offline"
        }).toArray((err, result) => {
            if (err) {
                reject(err)
            }

            resolve(result)
        })
    })

    return issues
}



/**
 * get Last issue
 */
export async function getLastIssue() {
    const issueCollection = client.db("cooe").collection("issues")

    const lastIssue = await new Promise((resolve, reject) => {
        issueCollection.find().sort({ issue_number: -1 }).limit(1).toArray((err, docs) => {
            if (err) {
                reject(err)
            }
            resolve(docs[0])

        })
    })

    if (lastIssue) {
        return lastIssue
    }
    return null
}


export async function calculateResult(issueNumber) {
    const issuesCollection = client.db("cooe").collection("issues")
    const contractsCollection = client.db("cooe").collection("contracts")
    try {
        const issue = await issuesCollection.findOne({ issue_number: issueNumber })
        if (!issue) {
            throw new ExpressError("no issue found", 400)
        }
        if (issue.status == "offline") {
            throw new ExpressError("issue is offline", 400)
        }
        const {minNumber, minColor} = await new Promise((resolve, reject) => {
            contractsCollection.find({ issue_number: issueNumber }).toArray((err, docs) => {
                if (err) {
                    reject(err)
                }
                // iterate over docs and get all guesses
                let contractResultsColor = {}
                let contractResultsNumber = {}
                docs.forEach(doc => {
                    if (doc.guess == 'green' || doc.guess == 'red' || doc.guess == 'blue') {
    
                        if (contractResultsColor[doc.guess]) {
                            contractResultsColor[doc.guess] = 1
                        } else {
                            contractResultsColor[doc.guess] += 1
                        }
                    }else{
                        if (contractResultsNumber[doc.guess]) {
                            contractResultsNumber[doc.guess] = 1
                        } else {
                            contractResultsNumber[doc.guess] += 1
                        }
                    }
                })
                let minNumber = Object.keys(contractResultsNumber).reduce((a, b) => {
                    return contractResultsNumber[a] < contractResultsNumber[b] ? a : b
                })[0]
                let minColor = Object.keys(contractResultsColor).sort((a, b) => {
                    return contractResultsColor[a] < contractResultsColor[b] ? a : b
                })[0]
                resolve({minNumber, minColor})
            })
        })
        return {minNumber, minColor}
    } catch (error) {
        throw new ExpressError("invalid user data",400,err)
    }
}


/**
 * process the all placed contracts of the current issue
 * 
 */

// 3 minutes 1 issue, 2 minutes and 30 seconds to order, 30 seconds to show the lottery result. It opens all day. The total number of trade is 480 issues
// If you spend 100 to trade, after deducting 2 service fee, your contract amount is 98:
// 1. JOIN GREEN: if the result shows 1,3,7,9, you will get (98*2) 196
// If the result shows 5, you will get (98*1.5) 147
// 2. JOIN RED: if the result shows 2,4,6,8, you will get (98*2) 196; If the result shows 0, you will get (98*1.5) 147
// 3. JOIN VIOLET: if the result shows 0 or 5, you will get (98*4.5) 441
// 4. SELECT NUMBER: if the result is the same as the number you selected, you will get (98*9) 882

export async function processContracts(issueNumber, minNumber,minColor) {
    const issuesCollection = client.db("cooe").collection("issues")
    const contractsCollection = client.db("cooe").collection("contracts")

    try {
        const issue = await issuesCollection.findOne({ issue_number: issueNumber })
        if (!issue) {
            throw new ExpressError("no issue found", 400)
        }
        if (issue.status == "offline") {
            throw new ExpressError("issue is offline", 400)
        }
        contractsCollection.find({ issue_number: issueNumber }).toArray(async (err, docs) => {
            if(err){
                throw err;
            }
            const opts = []
            docs.forEach(doc => {
                if (doc.guess == minColor) {
                    if (minColor == 'green') {
                        if (minNumber in [1,3,7,9]) {

                            opts.push({
                                updateOne: {
                                    filter: {"_id": doc._id}, 
                                    update: {$set: {"won": doc.final_bet *2 }}
                                }
                            })
                        }else if(minNumber == '5'){
                            opts.push({
                                updateOne: {
                                    filter: {"_id": doc._id},
                                    update: {$set: {"won": doc.final_bet *1.5 }}
                                    
                                }
                            })
                        }
                    }else if(minColor == 'red'){
                        if (minNumber in [2,4,6,8]) {
                            
                            opts.push({
                                updateOne: {
                                    filter: {"_id": doc._id},
                                    update: {$set: {"won": doc.final_bet * 2}}
                                }
                            })
                        }else if(minNumber == '0'){
                            opts.push({
                                updateOne: {
                                    filter: {"_id": doc._id},
                                    update: {$set: {"won": doc.final_bet *1.5 }}
                                    
                                }
                            })
                        }
                    }else if(minColor == 'violet'){
                        if(minNumber == 0 || minNumber == 5){
                            opts.push({
                                updateOne: {
                                    filter: {"_id": doc._id},
                                    update: {$set: {"won": doc.final_bet *4.5 }}
                                    
                                }
                            })
                        }
                    }
                }else if(doc.guess in ['0','1','2','3','4','5','6','7','8','9']){
                    
                        opts.push({
                            updateOne: {
                                filter: {"_id": doc._id},
                                update: {$set: {"won": doc.final_bet * 9}}
                            }
                        })
                    
                }
            })

            const results = await contractsCollection.bulkWrite(opts)
            if (!results.ok) {
                throw new ExpressError()
            }
        })
    } catch (error) {
        throw new ExpressError("invalid user data",400,error)
    }
}