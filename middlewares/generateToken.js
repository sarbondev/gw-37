import jwt from "jsonwebtoken";

export function generateToken(userId) {
  return jwt.sign(userId, process.env.JWT_KEY, { expiresIn: "7d" });
}
