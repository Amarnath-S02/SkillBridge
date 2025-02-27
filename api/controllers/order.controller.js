import createError from "../utils/createError.js";
import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";
import Stripe from "stripe";

export const intent = async (req, res, next) => {
  try {
    const stripe = new Stripe(process.env.STRIPE, {
      apiVersion: "2023-10-16", // Use the latest Stripe API version
    });

    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "Gig not found"));

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: gig.price * 100,
      currency: "inr",
      automatic_payment_methods: { enabled: true },
    });

    // Create a new order with status "pending"
    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,  // Store buyer ID correctly
      sellerId: gig.userId, // Store seller ID correctly
      price: gig.price,
      payment_intent: paymentIntent.id,
      status: "pending", // Ensure status is correctly set
    });

    await newOrder.save();

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Fetch orders correctly (for both Buyer and Seller)
// In order.controller.js

export const getOrders = async (req, res) => {
  const { sellerId } = req.query;

  try {
    let orders;
    if (sellerId) {
      // If sellerId is provided, filter orders by sellerId
      orders = await Order.find({ sellerId });
    } else {
      // If no sellerId is provided, return all orders (or any other default behavior)
      orders = await Order.find();
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};


// ✅ Confirm Payment and Start Processing Order
export const confirm = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      { payment_intent: req.body.payment_intent },
      { $set: { status: "in-progress" } },
      { new: true }
    );

    if (!order) return next(createError(404, "Order not found"));

    res.status(200).send("Order is now in progress.");
  } catch (err) {
    next(err);
  }
};

// ✅ New API: Mark Order as Completed (For Seller)
export const completeOrder = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, sellerId: req.userId }, // Ensure seller is completing
      { $set: { status: "completed" } },
      { new: true }
    );

    if (!order) return next(createError(404, "Order not found or unauthorized"));

    res.status(200).send("Order has been completed.");
  } catch (err) {
    next(err);
  }
};
