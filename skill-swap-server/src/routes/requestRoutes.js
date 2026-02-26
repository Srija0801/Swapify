import express from "express";
import { createRequest,getIncomingRequests,getOutgoingRequests,acceptRequest,rejectRequest } from "../controllers/requestController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/", protect, createRequest);
router.get("/incoming", protect, getIncomingRequests);
router.get("/outgoing", protect, getOutgoingRequests);
router.put("/:id/accept", protect, acceptRequest);
router.put("/:id/reject", protect, rejectRequest);



export default router;
