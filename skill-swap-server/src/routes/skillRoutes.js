import express from "express";
import { getAllSkills,searchSkill,getTeachersOfSkill } from "../controllers/skillController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/", getAllSkills);
router.get("/search", searchSkill);
router.get("/:skillId/teachers",protect, getTeachersOfSkill);

export default router;