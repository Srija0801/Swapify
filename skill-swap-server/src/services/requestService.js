import SkillRequest from "../models/SkillRequest.js";

export const createRequest = async (data) => {
  return await SkillRequest.create(data);
};

export const getIncomingRequest = async (id) => {
  return await SkillRequest.find({ receiver: id })
    .sort({ createdAt: -1, _id: -1 })
    .populate("sender", "name avatar_url")
    .populate("skill", "skill");
};

export const getOutgoingRequest = async (id) => {
  return await SkillRequest.find({ sender: id })
    .sort({ createdAt: -1, _id: -1 })
    .populate("receiver", "name avatar_url")
    .populate("skill", "skill");
};

export const updateStatus = async (id, status) => {
  return await SkillRequest.findByIdAndUpdate(id, { status }, { new: true });
};