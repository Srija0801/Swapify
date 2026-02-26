import express from "express";
import { getOrCreateExchange,sendMessage,getMessage,getUserExchanges,completeExchange,cancelExchange, } from "../controllers/messageController.js";
import { protect } from "../middlewares/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.use(protect);

router.get("/exchanges", getUserExchanges);
router.post("/exchange/:requestId", getOrCreateExchange);

router.get("/:exchangeId/messages", getMessage);
router.post("/:exchangeId/messages", sendMessage);

router.put("/exchange/:id/complete", completeExchange);
router.put("/exchange/:id/cancel", cancelExchange);


export default router;
