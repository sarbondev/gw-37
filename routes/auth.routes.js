import express from "express";
import { login } from "../controllers/auth.controller.js";
import { getProfile } from "../controllers/user.controller.js";
import isAuth from "../middlewares/isAuth.js";

export const AuthRoutes = express.Router();

AuthRoutes.post("/login", login);
AuthRoutes.get("/me", isAuth, getProfile);
