import dns from 'node:dns';

dns.setServers(['8.8.8.8', '1.1.1.1']);
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import skillRoutes from "./src/routes/skillRoutes.js";
import requestRoutes from "./src/routes/requestRoutes.js";
import messageRoutes from "./src/routes/messageRoutes.js";
import Message from "./src/models/Message.js";
import User from "./src/models/User.js";
import adminRoutes from "./src/routes/adminRoutes.js"

dotenv.config();
console.log("JWT_SECRET =", process.env.JWT_SECRET);
console.log("MONGO_URI =", process.env.MONGO_URI);
connectDB();

const app = express();
const server = http.createServer(app);

/* ---------- SOCKET.IO ---------- */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://swapify-gold.vercel.app",
  "https://swapify-4w4vxst8o-srija0801s-projects.vercel.app"
];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinExchange", (exchangeId) => {
    socket.join(exchangeId);
    console.log(`Joined exchange ${exchangeId}`);
  });

  socket.on("userOnline",async(userId)=>{
    socket.userId = userId;
    await User.findByIdAndUpdate(userId,{
      isOnline : true,
    });

    const now = new Date();

    io.emit("userStatus",{
      userId,
      isOnline:true,
    });
  });

  socket.on("sendMessage", async (data) => {
    try {
      const message = await Message.create({
        exchange: data.exchange,
        sender: data.sender,
        content: data.content,
        readBy: [data.sender],
      });

      io.to(data.exchange).emit("newMessage", message);
    } catch (err) {
      console.error("Socket message error:", err);
    }
  });

  socket.on("disconnect", async() => {
    console.log("User disconnected:", socket.id);

    if (!socket.userId) return;

    const lastSeen = new Date();

    await User.findByIdAndUpdate(socket.userId, {
      isOnline: false,
      lastSeen,
    });

    io.emit("userStatus", {
      userId: socket.userId,
      isOnline: false,
      lastSeen,
    });
  });
});

/* ---------- MIDDLEWARE ---------- */
const allowedOrigins = [
  "http://localhost:5173",
  "https://swapify-gold.vercel.app",
  "https://swapify-4w4vxst8o-srija0801s-projects.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

/* ---------- ROUTES ---------- */

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/msg", messageRoutes);


/* ---------- ERROR HANDLER ---------- */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 3000;
server.listen(PORT, () =>
  console.log(` Server running on port ${PORT}`)
);

export default server;
export { io };
