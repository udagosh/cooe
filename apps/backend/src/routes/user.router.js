import express from 'express'
import catchAsync from '../utils/catchAsync.js'
import ExpressError from '../utils/ExpressError.js'
import { getUser, saveUser } from '../db-utils/user.util.js'


const userRouter = express.Router()

userRouter.post("/register", catchAsync(async (req, res) => {
    try {
        console.log("user register")
        await saveUser(req.body)
        res.status(201).send("user created succesfully")
    } catch (error) {
        console.error(error)
        throw new ExpressError("invalid user data",400)
    }
}))



userRouter.get("/:userId",catchAsync(async (req,res) => {
    try {
        // console.log(req.)
        if (!req.headers['accept'].includes('application/json')) {
            res.status(400).send("client is not accepting json")
        }
        if (!req.params.userId) {
            res.status(400).send("user id is not defined")
        }
        const user = await getUser(req.params.userId) 
        res.json(user)
    } catch (error) {
        console.error(error)
        throw new ExpressError("invalid user id",400)
    }
}))
export default userRouter