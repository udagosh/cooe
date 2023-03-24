import { body, validationResult } from "express-validator";
import ErrorHandler from "../utils/ErrorHandler.js";
import User from "../models/User.js";

export const validateUser = [
  body("userId").not().isEmpty().custom((value) => {
    return User.find({
      userId: value,
    }).then((user) => {
      if (user.length > 0) {
        return Promise.reject("Username already in use");
      }
    });
  }).trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors.errors)
    if (!errors.isEmpty())
      return next(new ErrorHandler(errors.errors[0].msg, 400));
    next();
  },
];
