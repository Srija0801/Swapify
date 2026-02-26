import * as userService from "../services/userService.js";
import cloudinary from "../config/cloudinary.js";


export const getProfile = async (req, res) => {
    try {
        const result = await userService.getProfile(req.user.id); 
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateProfile = async (req, res) => {
    try {
        let avatarUrl;

        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: "avatars",
            });
            avatarUrl = uploadResult.secure_url;
        }

        const updated = await userService.updateProfile(req.user.id, {
            ...req.body,
            ...(avatarUrl && { avatar_url: avatarUrl }),
        });

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getUserSkills = async (req, res) => {
    try {
        const skills = await userService.getUserSkills(req.user.id);
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const addUserSkills = async (req, res) => {
    try {
        const { skill, skill_type, proficiency } = req.body;

        if (!skill || !skill_type || !proficiency) {
            return res.status(400).json({ error: "All skill fields are required" });
        }

        

        const result = await userService.addUserSkills({
            user: req.user.id,
            skill,
            skill_type,
            proficiency,
        });

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const removeUserSkills = async (req, res) => {
    try {
        const result = await userService.removeUserSkills(req.params.id);
        res.status(200).json({message : "Removed skill"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


export const getUserSkillsById = async (req, res) => {
  try {
    const skills = await userService.getUserSkillsById(req.params.id);
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};