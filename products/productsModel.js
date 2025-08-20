import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fullPrice: {
      type: Number,
      required: true,
    },
    sellPrice: {
      type: Number,
    },

    available: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },

    code: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
