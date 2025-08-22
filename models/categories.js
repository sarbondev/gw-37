import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  slug: { type: String, required: true },
  description: { type: String, default: "" },
  images: { type: [String], default: "" },
});

export const Categories = mongoose.model("Categories", categorySchema);
