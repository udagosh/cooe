import { walletSchema } from "./schemas.js";
import { client } from "./dbClient.js";
import { getUser } from "./user.util.js";


async function newWallet(walletObj){
    const wallet = walletSchema.parse(walletObj)
    const user = await getUser(wallet.user_id)
    if (user == null) {
        throw new Error("user not found")
    }
    const walletsCollection = client.db("cooe").collection("wallets")
    await walletsCollection.insertOne(wallet)
}

export {newWallet}