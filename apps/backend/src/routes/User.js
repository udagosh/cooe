import express from "express";
import { getAllUsers, createUser } from "../controllers/User.js";

import {validateUser} from "../middlewares/userValidator.js"

const router = express.Router();
router.get("/get", getAllUsers);
router.post("/create",validateUser, createUser);

export default router;
