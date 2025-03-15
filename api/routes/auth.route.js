import express from "express";
import { register, login, logout, loginAdmin,logoutAdmin , becomeSeller ,getCurrentUser} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/register", register); 
router.post("/login", login);       
router.post("/logout", logout);     
router.post("/admin/login", loginAdmin); 
router.get("/current-user", getCurrentUser); 
router.put("/become-seller", verifyToken, becomeSeller);
router.post("/admin/logout", logoutAdmin);

export default router;
