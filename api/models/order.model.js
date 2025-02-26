import mongoose from "mongoose";
const { Schema } = mongoose;
const OrderSchema = new Schema(
  {
    gigId: { type: String, required: true },
    img: { type: String },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    sellerId: { type: String, required: true },
    buyerId: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    payment_intent: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);