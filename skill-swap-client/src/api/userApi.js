import userAxios from "./userAxios";

export const userApi = {
  // 🔹 Logged-in user's profile (JWT based)
  getUserProfile: async () => {
    const res = await userAxios.get("/users/me");
    return res.data;
  },

  // 🔹 Update own profile
  updateProfile: async (data) => {
    const res = await userAxios.put("/users/me", data);
    return res.data;
  },

  // 🔹 Get logged-in user's skills
  getUserSkills: async () => {
    const res = await userAxios.get("/users/skills");
    return res.data;
  },

  // 🔹 Add skills (teaching + learning)
  addUserSkill: async (skillData) => {
  const res = await userAxios.post("/users/skills", skillData);
  return res.data;
},


  // 🔹 Remove a skill
  removeUserSkill: async (skillId) => {
    const res = await userAxios.delete(`/users/skills/${skillId}`);
    return res.data;
  },

  // 🔹 Public: get any user's profile by ID (used for viewing others)
  getUserById: async (userId) => {
    const res = await userAxios.get(`/users/${userId}`);
    return res.data;
  },

  // 🔹 Public: get any user's skills by ID
  getUserSkillsById: async (userId) => {
    const res = await userAxios.get(`/users/${userId}/skills`);
    return res.data;
  },

  // 🔹 Requests (unchanged)
  createRequest: async (receiver, skill, message) => {
    const res = await userAxios.post("/requests", {
      receiver,
      skill,
      message,
    });
    return res.data;
  },

  // 🔹 Skills master list
  getAllSkills: async () => {
    const res = await userAxios.get("/skills");
    return res.data;
  },

  
};
