import { walletSchema } from "./schemas.js";
import { client } from "./dbClient.js";
import { getUser } from "./user.util.js";
import ExpressError from "../utils/ExpressError.js";

/**
 * saves the wallet to the databasee, if wallet exists, it sends the existing wallet to the user
 * @param {wallet} walletObj 
 * @returns wallet
 */
async function newWallet(walletObj){
    console.log(walletObj)
    const wallet = walletSchema.parse(walletObj,{strip: true})
    const user = await getUser(wallet.user_id)
    if (user == null) {
        throw new ExpressError("user not found",400)
    }
    const walletsCollection = client.db("cooe").collection("wallets")
    const existingWallet = await walletsCollection.findOne({"user_id": user.user_id})
    if (existingWallet) {   
        return walletSchema.parse(existingWallet,{strip: true})
    }
    const res = await walletsCollection.insertOne(wallet)
    
    if (!res.acknowledged) {
    
        throw new ExpressError()
    }
    return wallet
}

export {newWallet}