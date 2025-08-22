import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "../controllers/products.controller.js";

export const ProductRoutes = express.Router();

ProductRoutes.get("/", getAllProducts);
ProductRoutes.post("/", createProduct);
ProductRoutes.put("/:id", updateProduct);
ProductRoutes.delete("/:id", deleteProduct);
ProductRoutes.get("/:id", getProductById);
