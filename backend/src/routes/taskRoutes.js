import express from "express";
import { createTask, getTask, updateTask, deleteTask } from "../controllers/taskController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Protect routes with JWT

router.post("/", verifyToken, createTask);
router.get("/", verifyToken, getTask);
router.put("/:id", verifyToken, updateTask);
router.delete("/:id", verifyToken, deleteTask);

export default router;