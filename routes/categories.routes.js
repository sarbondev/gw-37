import express from "express";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.controller.js";

export const CategoryRoutes = express.Router();

CategoryRoutes.get("/", getAllCategories);
CategoryRoutes.post("/", createCategory);
CategoryRoutes.put("/:id", updateCategory);
CategoryRoutes.delete("/:id", deleteCategory);
