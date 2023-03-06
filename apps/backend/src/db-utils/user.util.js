import { client } from "./dbClient.js";
import { userSchema } from "./schemas.js";

async function saveUser(userObj) {
    const user = userSchema.parse(userObj)
    
    const usersCollection = client.db("cooe").collection("users")
    const existing = await usersCollection.findOne({"user_id": user.user_id})
    if (existing) {
        throw new Error('user already exists')
    }
    await usersCollection.insertOne(user)
}


async function getUser(userId){
    const usersCollection = client.db("cooe").collection("users")
    const user = await usersCollection.findOne({"user_id": userId})
    return user
}
export {saveUser,getUser}