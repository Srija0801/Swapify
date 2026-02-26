import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwt.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";


export const registerUser = async (data) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashed = await bcrypt.hash(data.password, 10);
  const user = await User.create({ ...data, password: hashed });
  return { user, token: generateToken(user._id) };
};



export const loginUser = async(email,password) =>{
    const user = await User.findOne({email});
    if (!user || !(await bcrypt.compare(password, user.password)))
    throw new Error("Invalid credentials");
    
    
     if (user.isBlocked) {
      const err = new Error("Your account has been blocked by admin");
      err.statusCode = 403;
      throw err;
     }

    return {user,token:generateToken(user._id)};
};

export const forgetPassword = async(email) =>{
  const user = await User.findOne({email});
  if(!user){
     throw new Error("User not found");
  }

  const token = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = token;
  user.resetPasswordExpires =  Date.now() + 15 * 60 * 1000; 
  await user.save();

  const resetLink = `http://localhost:5173/reset-password/${token}`;

  await sendEmail({
    to:email,
    subject:"Reset Password",
    html:`
      <h3>Password Reset</h3>
      <p>Click below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link expires in 15 minutes.</p>
    `,
  });
}

export const resetPassword = async (token, password) => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error("Invalid or expired token");
  }

  // Hash new password
  user.password = await bcrypt.hash(password, 10);

  // Clear reset fields
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  return true;
};

export const getMe = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

