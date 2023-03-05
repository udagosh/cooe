import express from 'express'
import {client} from '../dbClient.js'
import { userSchema } from '../schemas.js'
import catchAsync from '../utils/catchAsync.js'
import ExpressError from '../utils/ExpressError.js'
const userRouter = express.Router()


userRouter.post("register", catchAsync(async (req, res) => {
    try {
        const user = userSchema.parse(req.body.user)
        const usersCollection = client.db("cooe").collection("users")
        await usersCollection.insertOne(user)
        res.status(201).send("user created succesfully")
    } catch (error) {
        throw new ExpressError("invalid user data",400)
    }
}))

export default userRouter