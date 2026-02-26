import userAxios from "./userAxios";


export const authApi = {
  signUp: async (name, email, password) => {
    const res = await userAxios.post("/auth/register", {
      name,
      email,
      password,
    });
    return res.data;
  },

  resetPassword: async(token,password) => {

    const res = await userAxios.post(`/auth/reset-password/${token}`,{
      password,
    });

    return res.data;
  },

  signIn: async (email, password) => {
    const res = await userAxios.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);

    return res.data;
  },

  getProfile: async () => {
    const res = await userAxios.get("/auth/me");
    return res.data;
  },
};
