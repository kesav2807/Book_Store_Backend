import express from "express";
import { getUser, login, signup } from "../controller/user.controller.js";

const router = express.Router();

// User Registration
router.post("/signup", signup);

// User Login
router.post("/login", login);

// Get All Users
router.get("/users", getUser); // Added this route

export default router;
