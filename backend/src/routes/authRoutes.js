import express from "express";
import { googleAuth } from "../controllers/authController.js";

const router = express.Router();

// POST /api/auth/google
router.post("/google", googleAuth);

export default router;