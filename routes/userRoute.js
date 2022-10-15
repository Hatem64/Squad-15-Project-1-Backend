import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
// router.post("/signup", signup);

// router.get("/verify/:token", verifyEmail);

// router.post("/forgotPassword", forgotPassword);
// router.patch("/resetPassword/:token", resetPassword);

export default router;
