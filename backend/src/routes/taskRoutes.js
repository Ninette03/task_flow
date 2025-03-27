import express from "express";
import { createTask, getTask, updateTask, deleteTask } from "../controllers/taskController.js";

const router = express.Router();

// Protect routes with JWT

router.post("/", createTask);
router.get("/", getTask);
router.put("/", updateTask);
router.delete("/", deleteTask);

export default router;