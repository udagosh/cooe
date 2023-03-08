import { walletSchema } from "./schemas.js";
import { client } from "../dbClient.js";
import { getUser } from "./user.util.js";
import ExpressError from "../utils/ExpressError.js";

/**
 * saves the wallet to the databasee, if wallet exists, it sends the existing wallet to the user
 * @param walletObj 
 * @returns wallet
 */
async function newWallet(walletObj) {
    console.log(walletObj)
    const wallet = walletSchema.parse(walletObj, { strip: true })
    const user = await getUser(wallet.user_id)
    if (user == null) {
        throw new ExpressError("user not found", 400)
    }
    const walletsCollection = client.db("cooe").collection("wallets")
    const existingWallet = await walletsCollection.findOne({ "user_id": user.user_id })
    if (existingWallet) {
        return walletSchema.parse(existingWallet, { strip: true })
    }
    const res = await walletsCollection.insertOne(wallet)

    if (!res.acknowledged) {

        throw new ExpressError()
    }
    return wallet
}


// update wallet balance
async function updateWallet(userId, balance) {
    const user = await getUser(userId)
    if (user == null) {
        throw new ExpressError("user not found", 400)
    }
    const walletsCollection = client.db("cooe").collection("wallets")
    const res = await walletsCollection.findOneAndUpdate({ "user_id": user.user_id }, { $set: { balance: balance } },{"returnDocument": "after"})
    if (!res) {
        throw new ExpressError("wallet not exists", 400)
    }
    return walletSchema.parse(res.value, { strip: true })
}

// add a new contract

// add a transaction

export { newWallet }