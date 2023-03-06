import express from 'express'
import { newWallet } from '../db-utils/wallet.util.js'
import catchAsync from '../utils/catchAsync.js'
import ExpressError from '../utils/ExpressError.js'


const walletRouter = express.Router()

walletRouter.post("/new", catchAsync(async (req, res) => {
    try {
        await newWallet(req.body)
        res.status(201).send("wallet created succesfully")
    } catch (error) {
        console.error(error)
        throw new ExpressError("invalid wallet",400)
    }
}))

export default walletRouter
