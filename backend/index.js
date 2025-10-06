import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ------------------- CLOUDINARY CONFIG -------------------
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// ------------------- MULTER SETUP -------------------
const upload = multer({ dest: "uploads/" });

// ------------------- UPLOAD ROUTE -------------------
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "aesthetic-artclub",
    });
    fs.unlinkSync(req.file.path); // remove local temp file
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Upload failed" });
  }
});

// ------------------- GET IMAGES ROUTE -------------------
app.get("/images", async (req, res) => {
  try {
    const { resources } = await cloudinary.search
      .expression("folder:aesthetic-artclub")
      .sort_by("public_id", "desc")
      .max_results(50)
      .execute();
    const urls = resources.map((file) => file.secure_url);
    res.json(urls);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

// ------------------- SERVE FRONTEND -------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adjust this path if your dist folder is in the root
const frontendBuildPath = path.join(__dirname, "../dist");

// Serve static files from Vite build
app.use(express.static(frontendBuildPath));

// For all other routes, serve index.html (React Router support)
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

// ------------------- START SERVER -------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
