import express from 'express'
import catchAsync from '../utils/catchAsync.js'
import ExpressError from '../utils/ExpressError.js'
import { getUser, saveUser } from '../db-utils/user.util.js'


const userRouter = express.Router()


userRouter.post("/", catchAsync(async (req, res) => {
    try {
        if (!req.headers['accept'].includes('application/json')) {
            res.status(400).send("client is not accepting json")
        }
        const user = await saveUser(req.body)
        res.status(201).json(user)
    } catch (error) {
        if (error instanceof ExpressError) {
            throw error
        }
        throw new ExpressError("invalid user data",400,error)
    }
}))



userRouter.get("/:userId",catchAsync(async (req,res) => {
    try {
        if (!req.headers['accept'].includes('application/json')) {
            res.status(400).send("client is not accepting json")
        }
        if (!req.params.userId) {
            res.status(400).send("user id is not defined")
        }
        const user = await getUser(req.params.userId) 
        res.status(200).json(user)
    } catch (error) {
        if (error instanceof ExpressError) {
            throw error
        }       
        throw new ExpressError("invalid user id",400,error)
    }
}))
export default userRouter