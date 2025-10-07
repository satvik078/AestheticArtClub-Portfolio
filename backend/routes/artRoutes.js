import express from "express";
import multer from "multer";
import Art from "../models/art.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// Set storage for multer
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    }
  });
 const upload = multer({ dest: "uploads/" , storage});

// Fetch all artworks
router.get("/", async (req, res) => {
  try {
    const arts = await Art.find();
    res.json(arts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch artworks" });
  }
});

// Upload new artwork
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { title, type } = req.body;
    const newArt = new Art({
      title,
      type,
      url: req.file.path // In production, use Cloudinary or S3
    });
    await newArt.save();
    res.json(newArt);
  } catch (err) {
    res.status(500).json({ message: "Upload failed" });
  }
});

// Delete artwork (Admin only)
router.delete("/:id", protect, async (req, res) => {
    try {
      await Art.findByIdAndDelete(req.params.id);
      res.json({ message: "Art deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

export default router;
