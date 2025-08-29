import express from "express";
import { AuthRoutes } from "./auth.routes.js";
import { CategoryRoutes } from "./categories.routes.js";
import { ProductRoutes } from "./products.routes.js";
import { UserRoutes } from "./user.routes.js";
import isAuth from "../middlewares/isAuth.js";

export const RootRoutes = express.Router();

RootRoutes.use("/auth", AuthRoutes);
RootRoutes.use("/categories", CategoryRoutes);
RootRoutes.use("/products", ProductRoutes);
RootRoutes.use("/users", isAuth, UserRoutes);
