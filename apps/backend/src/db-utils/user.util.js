import { client } from "../dbClient.js";
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


// update user address, user's email and user_id are not allowed to be updated
async function updateUserAddress(userId, address){
    const usersCollection = client.db("cooe").collection("users")
    // find user by user_id
    const user = await usersCollection.findOne({"user_id": userId})
    user.address = address
    userSchema.parse(user, {strip: true})
    const updatedUser = await usersCollection.findOneAndUpdate({"user_id": userId}, {$set: {"address": address}}, {"returnDocument": "after"})
    
    if (!updatedUser.value) {
        throw new ExpressError("user not found",400)
    }
    return userSchema.parse(updatedUser.value, {strip: true})
}

// delete the user, but also delete the user's associated wallet, and contracts associated with wallet and transactions associated with wallet



export {saveUser,getUser}