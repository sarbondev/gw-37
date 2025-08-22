import Product from "../products/productsModel.js";

// Barcha mahsulotlarni olish
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      products,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Yangi mahsulot qo‘shish
export const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: "Mahsulot yaratib bo‘lmadi", error });
  }
};

// Mahsulotni yangilash
export const updateProduct = async (req, res) => {
  const uptadedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
};

// Mahsulotni o‘chirish
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "deleted",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
// ID orqali mahsulot olish
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Mahsulot topilmadi" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};
