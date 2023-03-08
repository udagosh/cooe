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
export async function processContracts(issueNumber) {
    const issuesCollection = client.db("cooe").collection("issues")
    const contractsCollection = client.db("cooe").collection("contracts")

    try {
        
    } catch (error) {
        throw new ExpressError("invalid user data",400,error)
    }
}