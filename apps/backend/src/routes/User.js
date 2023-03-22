import express from "express";
import { getAllUsers, createUser } from "../controllers/User.js";

const router = express.Router();
router.get("/get", getAllUsers);
router.post("/create", createUser);

export default router;
