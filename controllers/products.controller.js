import { Products } from "../models/products.js";

const validateProduct = (data) => {
  const errors = [];

  if (!data.name || typeof data.name !== "string") {
    errors.push("Nomi kiritilishi shart va matn bo‘lishi kerak.");
  }

  if (
    data.fullPrice === undefined ||
    typeof data.fullPrice !== "number" ||
    data.fullPrice < 0
  ) {
    errors.push("To‘liq narxi kiritilishi shart va musbat son bo‘lishi kerak.");
  }

  if (data.sellPrice !== undefined) {
    if (typeof data.sellPrice !== "number" || data.sellPrice < 0) {
      errors.push("Sotish narxi musbat son bo‘lishi kerak.");
    } else if (data.sellPrice > data.fullPrice) {
      errors.push("Sotish narxi to‘liq narxdan katta bo‘lishi mumkin emas.");
    }
  }

  if (
    data.available === undefined ||
    typeof data.available !== "number" ||
    data.available < 0
  ) {
    errors.push("Mavjud miqdor kiritilishi shart va manfiy bo‘lmasligi kerak.");
  }

  if (data.images && !Array.isArray(data.images)) {
    errors.push("Rasmlar massiv ko‘rinishda bo‘lishi kerak.");
  }

  if (!data.code || typeof data.code !== "number") {
    errors.push("Kod kiritilishi shart va son bo‘lishi kerak.");
  }

  if (!data.description || typeof data.description !== "string") {
    errors.push("Tavsif kiritilishi shart va matn bo‘lishi kerak.");
  }

  if (!data.category || typeof data.category !== "string") {
    errors.push(
      "Kategoriya kiritilishi shart va to‘g‘ri ObjectId bo‘lishi kerak."
    );
  }

  return errors;
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const errors = validateProduct(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ status: "error", errors });
    }

    const newProduct = await Products.create(req.body);
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const errors = validateProduct(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ status: "error", errors });
    }

    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Mahsulot topilmadi" });
    }

    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Products.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Mahsulot topilmadi" });
    }

    return res.status(200).json({ status: "success" });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Mahsulot topilmadi" });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server xatosi", error: error.message });
  }
};
