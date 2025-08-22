import { Categories } from "../models/categories.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "category",
          as: "products",
        },
      },
    ]);
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const newCategory = await Categories.create(req.body);
    return res.status(201).json({
      status: "success",
      message: "Kategoriya muvaffaqiyatli yaratildi.",
      newCategory,
    });
  } catch (error) {
    return res.status(400).json({ status: "failed", message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const uptadedCategory = await Categories.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json({
      status: "success",
      message: "Kategoriya muvaffaqiyatli yangilandi.",
      uptadedCategory,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Categories.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Kategoriya topilmadi" });
    }

    await category.deleteOne();
    res.status(200).json({ message: "Kategoriya o‘chirildi" });
  } catch (error) {
    res.status(500).json({ message: "O‘chirishda xatolik", error });
  }
};
