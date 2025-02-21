import express from "express";
import { deleteUser, getUser, getUsers } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

// ✅ Allow admin to access users without authentication
router.get("/admin", getUsers); // No verifyToken

// ✅ Get all users (for regular users, authentication required)
router.get("/", verifyToken, getUsers);

// ✅ Get a single user (Auth required)
router.get("/:id", verifyToken, getUser);

// ✅ Delete a user (Auth required)
router.delete("/:id", verifyToken, deleteUser);

export default router;
