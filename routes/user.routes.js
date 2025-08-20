import express from "express";
import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

export const UserRoutes = express.Router();

UserRoutes.get("/", getAllUsers);
UserRoutes.post("/", createUser);
UserRoutes.patch("/:id", updateUser);
UserRoutes.delete("/:id", deleteUser);
