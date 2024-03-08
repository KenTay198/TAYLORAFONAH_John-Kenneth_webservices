import express from "express";
import authController from "../controllers/auth.controller";

const authRoutes = express.Router();

authRoutes.post("/login", authController.login);
authRoutes.get("/refreshToken", authController.refreshToken);

export default authRoutes;
