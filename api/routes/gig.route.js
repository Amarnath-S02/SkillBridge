import express from "express";
import { createGig, deleteGig, getGig, getGigs, fetchGigs } from "../controllers/gig.controller.js";

const router = express.Router();

router.post("/", createGig);
router.delete("/:id", deleteGig);

router.get("/single/:id", getGig);
router.get("/", getGigs);  // ✅ Normal users get gigs with filters
router.get("/admin/all", fetchGigs);  // ✅ Admins get all gigs

export default router;
