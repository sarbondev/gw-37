import { generateToken } from "../middlewares/generateToken.js";
import { Users } from "../models/user.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  const { phoneNumber, password } = req.body;

  if (!phoneNumber || !password) {
    return res.status(400).json({
      status: "failed",
      message: "Telefon raqam yoki parol kiritilmagan.",
    });
  }

  const user = await Users.findOne({ phoneNumber });

  if (!user) {
    return res.status(404).json({ message: "Foydalanuvchi topilmadi." });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    res.status(400).json({
      status: "failed",
      message: "Parol yoki telefon raqam noto'g'ri.",
    });
  }

  const token = generateToken(user._id);
  return res.status(200).json({
    status: "success",
    token,
    user,
  });
};
