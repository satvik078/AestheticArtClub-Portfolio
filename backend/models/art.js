import mongoose from "mongoose";

const artSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },       // Cloudinary URL
    public_id: { type: String, required: true }, // Cloudinary public_id for delete
    type: { type: String, enum: ["image", "video"], default: "image" },
    uploadedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("Art", artSchema);
