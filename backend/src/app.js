import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { googleAuth } from "./controllers/authController.js";
import path from "path";

dotenv.config();
dotenv.config({ path: path.resolve("backend", ".env") });
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
//Google Oauth route
app.post("/api/auth/google", googleAuth);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
export { app, server };