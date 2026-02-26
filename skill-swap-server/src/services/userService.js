import UserSkill from "../models/UserSkill.js";
import User from "../models/User.js";


export const getProfile = async (id) => {
    return await User.findById(id);
}


export const updateProfile = async (id, data) => {
    return await User.findByIdAndUpdate(id, data, { new: true });
}


export const getUserSkills = async (userId) => {
    return await UserSkill.find({ user: userId }).populate("skill");
}


export const addUserSkills = async (data) => {
    return await UserSkill.create(data);
}


export const removeUserSkills = async (id) => {
    return await UserSkill.findByIdAndDelete(id);
}


export const getUserById = async (id) => {
  return await User.findById(id);
};


export const getUserSkillsById = async (userId) => {
  return await UserSkill.find({ user: userId }).populate("skill");
};