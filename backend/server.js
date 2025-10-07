import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";
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


app.use("/gallery", artRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/uploads", express.static("uploads"));

// Ensure uploads folder exists
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer for file storage
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

// 🖼️ POST: Upload Image
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    const filePath = `/uploads/${req.file.filename}`;
    const fullUrl = `${process.env.BASE_URL}${filePath}`;

    res.status(200).json({
      success: true,
      message: "File uploaded successfully!",
      url: fullUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Upload failed",
    });
  }
});

// 🧠 GET: Health Check
app.get("/", (req, res) => {
  res.send("🎨 Aesthetic Art Backend is running!");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));