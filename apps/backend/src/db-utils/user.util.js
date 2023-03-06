import { client } from "./dbClient.js";
import { userSchema } from "./schemas.js";

async function saveUser(userObj) {
    const user = userSchema.parse(userObj)
    const usersCollection = client.db("cooe").collection("users")
    await usersCollection.insertOne(user)
}

export {saveUser}