import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { getOrders, intent,confirm ,completeOrder,checkPurchase} from "../controllers/order.controller.js";

const router = express.Router();

// router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
router.post("/create-payment-intent/:id", verifyToken, intent);
router.put("/", verifyToken, confirm);
 // Mark as "in-progress" after payment
router.put("/:id/complete", verifyToken, completeOrder); // Mark as "completed" by seller

router.get("/checkPurchase/:gigId", verifyToken, checkPurchase);

export default router;