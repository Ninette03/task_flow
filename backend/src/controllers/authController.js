import admin from "../config/firebase.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from 'dotenv';
dotenv.config();

export const googleAuth = async (req, res) => {
  const { token } = req.body;

  try {
    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email, name } = decodedToken;

    // Check if user exists, else create
    let user = await User.findByPk(uid);
    if (!user) {
      user = await User.create({
        uid,
        email,
        name,
        role: 'user' //Default role for new users
      });
    }

    // Generate JWT
    
    const userToken = jwt.sign({
      userId: user.uid,
      email,
      role: user.role
    }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ user, token: userToken });
  } catch (error) {
    console.error("Error during Google Auth:", error);
    res.status(401).json({ message: "Unauthorized" });
    }
};
