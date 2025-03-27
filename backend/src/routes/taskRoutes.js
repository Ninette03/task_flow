import express from "express";
import { createTask, getTask, updateTask, deleteTask } from "../controllers/taskController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Protect routes with JWT

router.post("/", createTask, verifyToken);
router.get("/", getTask, verifyToken);
router.put("/", updateTask, verifyToken);
router.delete("/", deleteTask, verifyToken);

export default router;