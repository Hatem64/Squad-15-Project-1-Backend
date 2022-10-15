import express from "express";
import { createApprenticeship } from "../controllers/apprenticeshipControlles.js";

const router = express.Router();

router.post("/", createApprenticeship);

export default router;
