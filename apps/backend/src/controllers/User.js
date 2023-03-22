import User from "../models/User.js";
import validator from "validator";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const usersList = await User.find();
  res.status(200).json(usersList);
});

export const createUser = catchAsyncError(async (req, res, next) => {
  const userData = req.body;
  var validation = true;

  const existinguser = await User.findOne({ userId: userData.userId });
  if (existinguser) {
    return next(new ErrorHandler("User already exist", 409));
  }

  if (validator.isAlphanumeric(userData.nickName)) {
    userData.address.map((address) => {
      validation =
        validator.isAlphanumeric(address.fullName) &&
        validator.isAlphanumeric(address.state) &&
        validator.isAlphanumeric(address.city) &&
        validator.isAlphanumeric(address.detailAddress);
    });

    if (validation) {
      const addedUser = new User(userData);
      await addedUser.save();
      res.status(200).json({ message: "User created successfully", addedUser });
    } else {
      return next(new ErrorHandler("Invalid data", 400));
    }
  } else {
    return next(error);
  }
});
