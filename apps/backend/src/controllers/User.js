import User from "../models/User.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const usersList = await User.find();
  res.status(200).json(usersList);
});

export const createUser = catchAsyncError(async (req, res, next) => {
  const userData = req.body;

  const existinguser = await User.findOne({ userId: userData.userId });
  if (existinguser) {
    return res.status(200).json({ user: existinguser });
  }

  const addedUser = new User(userData);
  await addedUser.save();
  res.status(200).json({ message: "User created successfully", addedUser });
});
