// backend/routes/adminRoutes.js
import express from "express";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
import Art from "../models/art.js";
import Admin from "../models/admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

// Admin Signup (for first-time setup)
router.post("/signup", async (req, res) => {
    try {
      const { username, password } = req.body;
      const existing = await Admin.findOne({ username });
      if (existing) return res.status(400).json({ message: "Admin already exists" });
  
      const admin = await Admin.create({ username, password });
      res.json(admin);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });// Admin Signup (for first-time setup)
  router.post("/signup", async (req, res) => {
    try {
      const { username, password } = req.body;
      const existing = await Admin.findOne({ username });
      if (existing) return res.status(400).json({ message: "Admin already exists" });
  
      const admin = await Admin.create({ username, password });
      res.json(admin);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.delete("/delete/:id", verifyAdmin, async (req, res) => {
  try {
    await Art.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete" });
  }
});

export default router;
