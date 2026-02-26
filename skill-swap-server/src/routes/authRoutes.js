import express from "express";
import { register, login,resetPassword,forgetPassword,getMe } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password",forgetPassword);
router.post("/reset-password/:token",resetPassword);
router.get("/me",protect,getMe);

export default router;
