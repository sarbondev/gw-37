import express from "express";
import { login } from "./authController.js";

export const authRoutes = express.Router();

authRoutes.post("/login", login);
