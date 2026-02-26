import * as authService from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const result = await authService.registerUser({
      name,
      email,
      password,
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
    try {
        const result = await authService.loginUser(req.body.email, req.body.password);
        res.status(200).json(result);

    } catch (error) {
        res.status(error.statusCode || 401).json({ error: error.message }); 
    }
};

export const forgetPassword = async(req,res) =>{
  
   try {
    const { email } = req.body;

    await authService.forgetPassword(email);

    res.status(200).json({
      message: "Reset link sent to email",
    });
  } catch (error) {
   
    res.status(400).json({
      error: error.message,
    });
  }
}


export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    await authService.resetPassword(token, password);

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await authService.getMe(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
