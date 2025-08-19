import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import chatRoute from "./routes/chat.route.js";


dotenv.config();  // ✅ Load .env variables before using them

const app = express();

const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://skillbridge-green.vercel.app", // deployed frontend
  "skillbridge-q5c0ia1wk-amarnaths-projects-925337c0.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error("Not allowed by CORS"), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());





// ✅ Database Connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.log("❌ MongoDB Connection Error:", error);
  }
};

// ✅ Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/chat", chatRoute);

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({ success: false, message: errorMessage });
});

// ✅ Start Server
app.listen(3000, () => {
  connect();
  console.log("🚀 Server is running on port 3000!");
});
