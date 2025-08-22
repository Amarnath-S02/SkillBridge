import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// Routes
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import chatRoute from "./routes/chat.route.js";

dotenv.config(); // Load .env variables

const app = express();

// ✅ CORS Setup
const allowedOrigins = [
  "http://localhost:5173",                // local dev
  "https://skillbridge-green.vercel.app", // old frontend
  "https://skillbridge-red.vercel.app",   // new frontend
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser requests (Postman, server)
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"), false);
  },
  credentials: true, // allow cookies
}));

// Enable preflight requests for all routes
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true,
}));

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Database Connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
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
  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }
  return res.status(errorStatus).json({ success: false, message: errorMessage });
});

// ✅ Start Server after DB connection
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connect();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}!`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
};

startServer();
