// backend/routes/authRoutes.js
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../models/admin.js";

const router = express.Router();


// Seed an admin (run only once manually)
router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: "Admin exists" });
  
    const hashed = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ email, password: hashed });
    await newAdmin.save();
    res.json({ message: "Admin created" });
  });

  // Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token });
});

export default router;
