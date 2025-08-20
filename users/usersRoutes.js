import express from "express";
import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "./userController.js"; // kichik harf bilan

export const usersRouter = express.Router();

usersRouter.get("/", getAllUsers); // Barcha foydalanuvchilarni olish
usersRouter.post("/", createUser); // Foydalanuvchi yaratish
usersRouter.patch("/:id", updateUser); // Foydalanuvchini yangilash
usersRouter.delete("/:id", deleteUser); // Foydalanuvchini o'chirish
