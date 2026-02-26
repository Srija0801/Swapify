import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./src/models/User.js"; // adjust path if needed

dotenv.config();

const newPassword = "admin@sri"; // password you want

const resetPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // connect to MongoDB

    const hash = await bcrypt.hash(newPassword, 10);

    const result = await User.updateOne(
      { email: "admin@gmail.com" },
      { password: hash }
    );

    console.log("Password reset done:", result);

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
};

resetPassword();
