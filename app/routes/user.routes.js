import express from "express";
import UserController from "../controllers/User.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import loggerMiddleware from "../middleware/logger.middleware.js";

const router = express.Router();

// Menggunakan middleware di semua routes
router.use(authMiddleware, loggerMiddleware);

// Rute mendapat semua data user
router.get("/", UserController.getAll);
router.get("/profile", UserController.getProfile);
router.post("/update", UserController.updateUser);
router.post("/update-password", UserController.updatePassword);

export default router;
