import express from "express";
import { register,login,logout} from "../controllers/auth.controller.js";



;



const router=express.Router();


// router.get("/register", register);
// router.get("/login", login);
// router.get("/logout", logout);

router.post("/register", register); // Use POST for user creation
router.post("/login", login);       // Use POST for login
router.post("/logout", logout);     // Use POST for logout


export default router;