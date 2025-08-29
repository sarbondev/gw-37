import express from "express";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.controller.js";
import isAuth from "../middlewares/isAuth.js";

export const CategoryRoutes = express.Router();

CategoryRoutes.get("/", getAllCategories);
CategoryRoutes.post("/", isAuth, createCategory);
CategoryRoutes.put("/:id", isAuth, updateCategory);
CategoryRoutes.delete("/:id", isAuth, deleteCategory);
