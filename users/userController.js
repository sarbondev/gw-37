import { User } from "../models/user.js";

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users, status: "failed" });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: "Foydalanuvchi yaratildi",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate({ _id: req.params.id });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Foydalanuvchi topilmadi",
      });
    }

    await user.updateOne(req.body);

    res.status(200).json({
      status: "success",
      message: "Foydalanuvchi yangilandi",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete({ _id: req.params.id });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Foydalanuvchi topilmadi",
      });
    }

    await user.deleteOne(req.body);

    res.status(204).json({
      status: "success",
      message: "Foydalanuvchi o'chirildi",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
