import express from "express";
import Art from "../models/art.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Fetch all artworks metadata (from MongoDB)
router.get("/", async (req, res) => {
  try {
    const arts = await Art.find();
    res.json(arts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch artworks" });
  }
});

// Save artwork metadata after uploading to Cloudinary
router.post("/metadata", protect, async (req, res) => {
  try {
    const { title, type, url, public_id } = req.body;
    const newArt = new Art({ title, type, url, public_id });
    await newArt.save();
    res.json(newArt);
  } catch (err) {
    res.status(500).json({ message: "Metadata save failed" });
  }
});

// Delete artwork metadata entry
router.delete("/:id", protect, async (req, res) => {
  try {
    await Art.findByIdAndDelete(req.params.id);
    res.json({ message: "Art metadata deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
