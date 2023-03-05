import express from 'express'
import client from '../dbClient'
import { userSchema } from '../models/schemas'
import catchAsync from '../utils/catchAsync'
import ExpressError from '../utils/ExpressError'
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