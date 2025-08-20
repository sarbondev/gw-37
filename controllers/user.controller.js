import User from "../models/user.js";

export const getAllUsers = async (req, res) => {
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
    const { fullName, password, phoneNumber } = req.body;

    if (!fullName || !password || !phoneNumber) {
      return res.status(409).json({
        message: "Hamma maydonlar to'ldiriishi shart!",
        status: "failed",
      });
    }

    const isUserExist = await User.find(phoneNumber);

    if (isUserExist) {
      return res.status(409).json({
        message: "Bunday foydalanuvchi oldin ro'yhatdan o'tgan!",
        status: "failed",
      });
    }

    const newUser = new User({
      fullName,
      password,
      phoneNumber,
    });

    await newUser.save();

    return res.status(201).json({
      status: "Foydalanuvchi muvaffaqiytali yaratildi",
      newUser,
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
    const { id } = req.params;
    const { fullName, password, phoneNumber } = req.body;

    if (!fullName || !password || !phoneNumber) {
      return res.status(409).json({
        message: "Hamma maydonlar to'ldiriishi shart!",
        status: "failed",
      });
    }

    const isUserExist = await User.findOne(phoneNumber);

    if (!isUserExist) {
      return res.status(404).json({
        status: "error",
        message: "Foydalanuvchi topilmadi",
      });
    }

    const isPasswordCorrect = await User.isPasswordCorrect(
      password,
      isUserExist.password
    );

    if (!isPasswordCorrect) {
      return res.status(404).json({
        status: "error",
        message: "Parol yoki telefon raqam noto'g'ri",
      });
    }

    const updatedUser = {
      fullName,
      password,
      phoneNumber,
    };

    const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });

    return res.status(200).json({
      status: "success",
      message: "Foydalanuvchi yangilandi",
      user,
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
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

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
