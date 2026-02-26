import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import SkillRequest from "../models/SkillRequest.js";
import Exchange from "../models/Exchange.js";


// Get all users
export const getAllUsersService = async () => {
  return await User.find().select("-password");
};

// Add user
export const addUserService = async ({ name, email, password,role }) => {
  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    role: role || "user",
  });

  return user;
};

// Delete user
export const deleteUserService = async (userId) => {
  await User.findByIdAndDelete(userId);
  return { message: "User deleted" };
};

// Block / Unblock user
export const toggleBlockUserService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  user.isBlocked = !user.isBlocked;
  await user.save();

  return { isBlocked: user.isBlocked };
};

// Get all skill requests
export const getAllRequestsService = async () => {
  return await SkillRequest.find().populate("sender receiver skill");
};

// Cancel request
export const cancelRequestService = async (requestId) => {
  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    throw new Error("Invalid request ID");
  }

  const request = await SkillRequest.findById(requestId);
  if (!request) {
    throw new Error("Request not found");
  }

  request.status = "cancelled";
  await request.save();

  await Exchange.updateMany(
    { request: request._id },
    { status: "cancelled" }
  );

  return { message: "Request cancelled" };
};
