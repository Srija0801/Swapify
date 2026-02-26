import SkillRequest from "../models/SkillRequest.js";
import * as messageService from "../services/messageService.js";
import Message from "../models/Message.js";
import { io } from "../../server.js";

export const getOrCreateExchange = async (req, res) => {
    try {
        const request = await SkillRequest.findById(req.params.requestId);
        if (!request) {
            return res.status(404).json({ error: "Skill request not found" });
        }
        const exchange = await messageService.getOrCreateExchange(request);
        res.status(200).json(exchange);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getMessage = async (req, res) => {
    try {
        const messages = await messageService.getMessage(req.params.exchangeId);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const sendMessage = async (req, res) => {
    try {
        if (!req.body.content) {
            return res.status(400).json({ error: "Message content is required" });
        }

        const message = await messageService.sendMessage({
            exchange: req.params.exchangeId,
            sender: req.user.id,
            content: req.body.content,
        });
           
        io.to(req.params.exchangeId).emit("newMessage", message);
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getUserExchanges = async (req, res) => {
    try {
        const exchanges = await messageService.getUserExchanges(req.user.id);
        res.status(200).json(exchanges);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const completeExchange = async (req, res) => {
    try {
        await messageService.completeExchange(req.params.id);
        res.status(200).json({ message: "Exchange completed" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const cancelExchange = async (req, res) => {
    try {
        await messageService.cancelExchange(req.params.id);
        res.status(200).json({ message: "Exchange cancelled" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
