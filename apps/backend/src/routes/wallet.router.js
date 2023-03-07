import express from 'express'
import { newWallet } from '../db-utils/wallet.util.js'
import catchAsync from '../utils/catchAsync.js'
import ExpressError from '../utils/ExpressError.js'


const walletRouter = express.Router()

/**
 * if wallet exists, returns the new wallet, if not creates a new wallet and returns it
 */
walletRouter.post("/", catchAsync(async (req, res) => {
    try {
        if (!req.headers["accept"].includes("application/json")) {
            res.status(400).send("client is not accepting json")
        }
        
        const wallet = await newWallet(req.body)
        res.status(201).json(wallet)
    } catch (error) {
        if (error instanceof ExpressError) {
            throw error
        }
        throw new ExpressError("invalid wallet",400,error)
    }
}))


export default walletRouter
