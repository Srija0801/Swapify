import express from "express";
import { adminLogin } from "../controllers/adminController.js";
import {
  getAllUsers,
  addUser,
  deleteUser,
  toggleBlockUser,
  getAllRequests,
  cancelRequest,
} from "../controllers/adminFeatureController.js";
import { adminAuth } from "../middlewares/adminAuth.js";

const router = express.Router();

router.use((req, res, next) => {
  console.log("ADMIN ROUTE HIT:", req.method, req.originalUrl);
  next();
});



router.post("/login", adminLogin);


router.get("/users", adminAuth, getAllUsers);
router.post("/users", adminAuth, addUser);
router.delete("/users/:id", adminAuth, deleteUser);
router.patch("/users/:id/block", adminAuth, toggleBlockUser);

router.get("/requests", adminAuth, getAllRequests);
router.patch("/requests-cancel/:id", adminAuth, cancelRequest);

export default router;
