import express from "express";
import { login } from "../controllers/auth.controller.js";

export const AuthRoutes = express.Router();

AuthRoutes.post("/login", login);
