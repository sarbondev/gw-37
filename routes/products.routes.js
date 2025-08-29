import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "../controllers/products.controller.js";
import isAuth from "../middlewares/isAuth.js";

export const ProductRoutes = express.Router();

ProductRoutes.get("/", getAllProducts);
ProductRoutes.post("/", isAuth, createProduct);
ProductRoutes.put("/:id", isAuth, updateProduct);
ProductRoutes.delete("/:id", isAuth, deleteProduct);
ProductRoutes.get("/:id", getProductById);
