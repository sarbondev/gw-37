import Categories from "./categoriesModel.js";
import Category from "./categoriesModel.js";

// 🔹 BARCHA KATEGORIYALARNI OLIB KELISH
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
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// 🔹 YANGI KATEGORIYA YARATISH
export const createCategory = async (req, res) => {
  try {
    const newCategory = await Categories.create(req.body);
    res.status(201).json({ newCategory });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
// 🔹 KATEGORIYANI YANGILASH (ID orqali)
export const updateCategory = async (req, res) => {
  try {
    const uptadedCategory = await Categories.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ uptadedCategory });
  } catch (error) {
    res.status(500).json({ message: "Yangilashda xatolik", error });
  }
};

// 🔹 KATEGORIYANI O‘CHIRISH (ID orqali)
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Kategoriya topilmadi" });
    }

    await category.deleteOne();
    res.status(200).json({ message: "Kategoriya o‘chirildi" });
  } catch (error) {
    res.status(500).json({ message: "O‘chirishda xatolik", error });
  }
};
