import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
  
  try {
    console.log("Authorization Header:", req.headers.authorization);
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Extracted Token:", token);
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded User:", decoded);

    req.user = {
      userId: decoded.userId || decoded.id || decoded.userid,
      role: decoded.role || 'user',
      ...decoded
    };
    console.log("Normalized req.user:", req.user); // Attach user info to request
    next();
  } catch (error) {
    console.error("Token Verification Error:", error.message);
    res.status(401).json({ error: "Invalid token" });
    }
};

//Admin middleware auth
export const isAdmin = (req, res, next) => {
  try {
    console.log("User role check:", req.user.role);
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        error: "Forbidden: Admin access required" 
      });
    }
    next();
  } catch (error) {
    console.error("Admin Check Error:", error.message);
    res.status(500).json({ error: "Role verification failed" });
  }
};