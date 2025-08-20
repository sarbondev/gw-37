import express from "express";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./categoriesController.js";

const router = express.Router();

// GET /api/categories - barcha kategoriyalar
// POST /api/categories - yangi kategoriya yaratish

// GET /api/categories/:id - bitta kategoriya
// PUT /api/categories/:id - yangilash
// DELETE /api/categories/:id - o‘chirish
router.get("/", getAllCategories); // GET /products
router.post("/", createCategory); // POST /products
router.put("/:id", updateCategory); // PUT /products/:id
router.delete("/:id", deleteCategory);

export default router;
