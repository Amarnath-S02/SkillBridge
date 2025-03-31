import express from "express";
import { getUsers, deleteUser, getUser, updateUser,becomeSeller } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get("/", getUsers);
router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUser);
router.put("/:id", verifyToken, updateUser); // ✅ Add the update route
router.put("/become-seller", verifyToken, becomeSeller);

export default router;
