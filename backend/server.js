import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "./config/db.js";
import artRoutes from "./routes/artRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());

// Cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Ensure uploads folder exists (for temporary local file storage before Cloudinary upload)
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Main API routes
app.use("/gallery", artRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/uploads", express.static("uploads"));

// Health Check
app.get("/", (req, res) => {
  res.send("🎨 Aesthetic Art Backend is running!");
});

// CLOUDINARY ARTWORK UPLOAD ENDPOINT
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // Upload to Cloudinary from temp local file
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "aesthetic-artclub",
    });
    // Remove temp file after upload
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      url: result.secure_url,         // For frontend display
      public_id: result.public_id,    // For future deletion
      message: "File uploaded successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Upload failed",
    });
  }
});

// FETCH ALL IMAGES FROM CLOUDINARY
app.get("/images", async (req, res) => {
  try {
    const { resources } = await cloudinary.search
      .expression("folder:aesthetic-artclub")
      .sort_by("public_id", "desc")
      .max_results(50)
      .execute();

    const urls = resources.map((file) => ({
      url: file.secure_url,
      public_id: file.public_id,
    }));

    res.json(urls);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

// DELETE IMAGE ON CLOUDINARY
app.delete("/delete", async (req, res) => {
  const { public_id } = req.body;
  if (!public_id) return res.status(400).json({ error: "No public_id provided" });

  try {
    await cloudinary.uploader.destroy(public_id); // delete from Cloudinary
    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete image" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
