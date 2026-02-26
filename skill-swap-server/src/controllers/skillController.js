import * as skillService from "../services/skillService.js";


export const getAllSkills = async (req, res) => {
    try {
        const skills = await skillService.getAllSkills();
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const searchSkill = async (req, res) => {
    try {
        const skills = await skillService.searchSkill(req.query.q || "");
        res.status(200).json(skills);
        console.log("Search query:", req.query.q);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




export const getTeachersOfSkill = async (req, res) => {
  try {
    const { skillId } = req.params;
    const currentUserId = req.user._id;

    const teachers = await skillService.getTeachersOfSkill(
      skillId,
      currentUserId
    );

    res.status(200).json(teachers);
  } catch (err) {
    console.error("Get teachers error:", err);
    res.status(500).json({ error: err.message });
  }
};


