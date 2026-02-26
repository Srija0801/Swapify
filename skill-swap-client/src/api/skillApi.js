
import { userApi } from "./userApi";
import userAxios from "./userAxios";

export const skillApi = {
  getAllSkills: async () => {
    const res = await userAxios.get("/skills");
    return res.data;
  },

  getTeachersForSkill: async (skillId) => {
    const res = await userAxios.get(`/skills/${skillId}/teachers`);
    return res.data;
  },
};
