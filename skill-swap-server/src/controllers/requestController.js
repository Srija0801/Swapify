import * as requestService from "../services/requestService.js";


export const createRequest = async (req, res) => {
  try {
    const { skill, message, receiver } = req.body;

    if (!skill || !message || !receiver) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (receiver === req.user._id) {
      return res
        .status(400)
        .json({ error: "You cannot send a request to yourself" });
    }

    const request = await requestService.createRequest({
      sender: req.user._id,
      receiver,
      skill,
      message,
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getIncomingRequests = async (req, res) => {
    try {
        const requests = await requestService.getIncomingRequest(req.user.id);
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getOutgoingRequests = async (req, res) => {
    try {
        const requests = await requestService.getOutgoingRequest(req.user.id);
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const acceptRequest = async (req, res) => {
    try {
        const updated = await requestService.updateStatus(req.params.id, "accepted");
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const rejectRequest = async (req, res) => {
    try {
        const updated = await requestService.updateStatus(req.params.id, "rejected");
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
