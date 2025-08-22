import { Users } from "../users/userModel.js";
import jwt from "jsonwebtoken";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: "30d",
  });
};

export const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({
      status: "error",
      message: "Username and password not provided",
    });
  } else {
    const user = await Users.findOne({ username: username });

    if (!user || !user.correctPassword(password, user.password)) {
      res.status(400).json({
        status: "error",
        message: "Invalid username or password",
      });
    } else {
      const token = signToken(user._id);
      res.status(200).json({
        status: "success",
        token,
      });
    }
  }
};
