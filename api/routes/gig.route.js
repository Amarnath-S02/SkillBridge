import express from "express";
import {
  createGig,
  deleteGig,
  getGig,
  getAllGigs,
  deleteGigByAdmin,
  getGigs
} from "../controllers/gig.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();
router.delete("/admin/delete/:id", deleteGigByAdmin);
router.post("/", verifyToken, createGig);
router.delete("/:id", verifyToken, deleteGig);
router.get("/getSortedGigs",getGigs)
router.get("/single/:id", getGig);
router.get("/", getAllGigs);

export default router;