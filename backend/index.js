import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import artRoutes from "./routes/artRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/art", artRoutes);
app.use("/api/admin", adminRoutes);

// ------------------- CLOUDINARY CONFIG -------------------
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// ------------------- MULTER SETUP -------------------
const upload = multer({ dest: "uploads/"});

// ------------------- UPLOAD ROUTE -------------------
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "aesthetic-artclub",
    });
    fs.unlinkSync(req.file.path); // remove local temp file
    res.json({ url: result.secure_url, public_id: result.public_id });
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
    const urls = resources.map((file) => ({
      url: file.secure_url,
      public_id: file.public_id,
    }));
    res.json(urls);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

// ------------------- DELETE IMAGE ROUTE -------------------
app.delete("/delete", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "No URL provided" });

  try {
    // Extract public_id from the URL
    // Cloudinary URL format: https://res.cloudinary.com/<cloud_name>/.../<public_id>.<ext>
    const segments = url.split("/");
    const fileWithExt = segments[segments.length - 1]; // last part with extension
    const public_id = fileWithExt.substring(0, fileWithExt.lastIndexOf(".")); // remove extension

    await cloudinary.uploader.destroy(`aesthetic-artclub/${public_id}`); // delete from folder
    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete image" });
  }
});

// ------------------- SERVE FRONTEND -------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendBuildPath = path.join(__dirname, "../dist");

app.use(express.static(frontendBuildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

// ------------------- START SERVER -------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
