import { client } from "./dbClient.js";
import { userSchema } from "./schemas.js";
import ExpressError from '../utils/ExpressError.js'

async function saveUser(userObj) {
    const user = userSchema.parse(userObj, {strip: true})
    const usersCollection = client.db("cooe").collection("users")
    const existing = await usersCollection.findOne({"user_id": user.user_id})
    if (existing) {
        return userSchema.parse(existing,{strip: true})   
    }
    const {acknowledged} = await usersCollection.insertOne(user)
    if (!acknowledged) {
        throw new ExpressError("Internal Server Error",500)
    }

    return user
}


async function getUser(userId){
    const usersCollection = client.db("cooe").collection("users")
    const user = await usersCollection.findOne({"user_id": userId})
    if (!user) {
        throw new ExpressError("user not found",400)
    }
    return user
}
export {saveUser,getUser}