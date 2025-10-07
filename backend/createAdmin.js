import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Admin from "./models/admin.js"; // adjust path according to your project structure

dotenv.config();

// ------------------ CONFIG ------------------
const MONGO_URI = process.env.MONGO_URI; // should be in .env

if (!MONGO_URI) {
  console.error("❌ MONGO_URI not defined in .env");
  process.exit(1);
}

// ------------------ ADMIN DETAILS ------------------
const adminData = {
  username: "admin",
  email: "satvikpandey078@gmail.com",
  password: "Satvik@128", // plaintext password, will be hashed
};

// ------------------ CONNECT TO MONGO ------------------
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed", err);
    process.exit(1);
  });

// ------------------ CREATE ADMIN ------------------
const createAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log("⚠️ Admin user already exists");
      process.exit(0);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminData.password, salt);

    // Create admin user
    const admin = new Admin({
      username: adminData.username,
      email: adminData.email,
      password: hashedPassword,
      isAdmin: true,
    });

    await admin.save();
    console.log("✅ Admin user created successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to create admin", err);
    process.exit(1);
  }
};

// ------------------ RUN ------------------
createAdmin();
