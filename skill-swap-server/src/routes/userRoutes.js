import express from "express";
import { getProfile,updateProfile,getUserSkills,addUserSkills,removeUserSkills,getUserById,getUserSkillsById }  from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();
router.get("/me", protect, getProfile);
router.put("/me", protect,upload.single("avatar") ,updateProfile);
router.get("/skills",protect,getUserSkills);
router.post("/skills", protect, addUserSkills);
router.delete("/skills/:id", protect, removeUserSkills);

router.get("/:id", getUserById);
router.get("/:id/skills", getUserSkillsById);


export default router;