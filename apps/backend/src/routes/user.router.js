import express from 'express'
import catchAsync from '../utils/catchAsync.js'
import ExpressError from '../utils/ExpressError.js'
import { saveUser } from '../db-utils/user.util.js'


const userRouter = express.Router()

userRouter.post("register", catchAsync(async (req, res) => {
    try {
        saveUser(req.body.user)
        res.status(201).send("user created succesfully")
    } catch (error) {
        throw new ExpressError("invalid user data",400)
    }
}))

export default userRouter