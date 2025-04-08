import express from "express";
import { createTask, getAllTasks, updateTask, deleteTask, getAllTasks, getUserTasks, markTaskCompleted } from "../controllers/taskController.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// Admin routes

router.post("/", verifyToken, isAdmin, createTask);
router.get("/admin", verifyToken, isAdmin, getAllTasks);
router.put("/:id", verifyToken, isAdmin, updateTask);
router.delete("/:id", verifyToken, isAdmin, deleteTask);

// User routes
router.get("/", verifyToken, getUserTasks);
router.patch("/:id/complete", verifyToken, markTaskCompleted);

export default router;