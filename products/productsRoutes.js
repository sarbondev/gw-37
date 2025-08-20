// routes/productsRoutes.js
import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "../products/productsController.js";

const router = express.Router();

router.get("/", getAllProducts); // GET /products
router.post("/", createProduct); // POST /products
router.put("/:id", updateProduct); // PUT /products/:id
router.delete("/:id", deleteProduct); // DELETE /products/:id
router.get("/:id", getProductById); // ✅ Yangi qo‘shildi

export default router;
