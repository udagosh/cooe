import { walletSchema } from "./schemas.js";
import { client } from "./dbClient.js";


async function newWallet(wallet){
    walletSchema.parse(wallet)
    const walletsCollection = client.db("cooe").collection("wallets")
    await walletsCollection.insertOne(user)
}

export {newWallet}