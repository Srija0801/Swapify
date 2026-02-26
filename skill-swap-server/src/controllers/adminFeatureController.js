import {
  getAllUsersService,
  addUserService,
  deleteUserService,
  toggleBlockUserService,
  getAllRequestsService,
  cancelRequestService,
} from "../services/adminService.js";

// 1️⃣ View all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add user
export const addUser = async (req, res) => {
  try {
    const user = await addUserService(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Remove user
export const deleteUser = async (req, res) => {
  try {
    const result = await deleteUserService(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 2️⃣ Block / Unblock user
export const toggleBlockUser = async (req, res) => {
  try {
    const result = await toggleBlockUserService(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// 3️⃣ View all requests
export const getAllRequests = async (req, res) => {
  try {
    const requests = await getAllRequestsService();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 4️⃣ Cancel request
export const cancelRequest = async (req, res) => {
  try {
    console.log("CANCEL REQUEST ID:", req.params.id);

    const result = await cancelRequestService(req.params.id);

    console.log("CANCEL RESULT:", result);

    res.json(result);
  } catch (err) {
    console.error("CANCEL ERROR:", err); // 👈 IMPORTANT

    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  }
};