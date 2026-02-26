import Skill from "../models/Skill.js";
import UserSkill from "../models/UserSkill.js";
import mongoose from "mongoose";

export const getAllSkills = async() =>{
    return await Skill.find();
}

export const searchSkill = async(q) =>{
    return await Skill.find({skill:{$regex:q,$options:"i"}});
}




export const getTeachersOfSkill = async (skillId, currentUserId) => {
  return await UserSkill.find({
    skill: new mongoose.Types.ObjectId(skillId),
    skill_type: "teaching",
    user: { $ne: new mongoose.Types.ObjectId(currentUserId) }
  })
    .populate({
      path: "user",
      select: "name avatar_url bio"
    })
    .populate({
      path: "skill",
      select: "skill"
    });
};
