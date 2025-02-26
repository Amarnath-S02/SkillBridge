import express from "express";
import { register, login, logout, loginAdmin,logoutAdmin  } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register); 
router.post("/login", login);       
router.post("/logout", logout);     
router.post("/admin/login", loginAdmin); 


router.post("/admin/logout", logoutAdmin);

export default router;
