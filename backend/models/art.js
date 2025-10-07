import mongoose from "mongoose";

const artSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, enum: ["image", "video"], default: "image" },
    uploadedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("Art", artSchema);
