import { client } from "./dbClient.js";
import { issueSchema } from "./schemas";


/**
 * creates the new issue
 * 
 * @param {issueSchema} issueObj
 * @returns "success" on succesful save
 * @throws "error" on failure
 */
async function newIssue(issueObj){
    const issue = issueSchema.parse(issueObj)
    const issueCollection = client.db("cooe").collection("issues")
    const isThereissue  =(await issueCollection.findOne({
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
async function updateIssue(issueObj){
    const issue = issueSchema.parse(issueObj)
    
    const issueCollection = client.db("cooe").collection("issues")
    const result = await issueCollection.findOneAndUpdate({"issue_number": issue.issue_number},{
        $set: {"result": issue.result, "status": issue.status}
    })

    if (result.value == null) {
        throw new Error("no issue found")
    }
}


/**
 * returns all completed issues
 */
async function getAllIssues(){
    const issueCollection = client.db("cooe").collection("issues")
    const issues = await new Promise((resolve,reject) => {

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
async function getLastIssue(){
    const issueCollection = client.db("cooe").collection("issues")
    
    const lastIssue = await new Promise((resolve, reject) => {
        issueCollection.find().sort({issue_number: -1}).limit(1).toArray((err,docs) => {
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

