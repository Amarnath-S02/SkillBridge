import createError from "../utils/createError.js";
import Review from "../models/review.model.js";
import Gig from "../models/gig.model.js";
import Order from "../models/order.model.js";

export const createReview = async (req, res, next) => {
  console.log("Incoming Review Data:", req.body);
  console.log("Authenticated User:", req.userId);

  if (req.isSeller) return next(createError(403, "Sellers can't create a review!"));

  try {
    const existingReview = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });

    if (existingReview) {
      return next(createError(403, "You have already reviewed this gig!"));
    }

    const hasPurchased = await Order.findOne({
      gigId: req.body.gigId,
      buyerId: req.userId,
    });

    console.log("Purchase Check:", hasPurchased);

    if (!hasPurchased) {
      return next(createError(403, "You must purchase the gig before reviewing!"));
    }

    const newReview = new Review({
      userId: req.userId,
      gigId: req.body.gigId,
      desc: req.body.desc,
      star: req.body.star,
    });

    const savedReview = await newReview.save();
    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });

    res.status(201).send(savedReview);
  } catch (err) {
    console.error("Error Creating Review:", err);
    next(err);
  }
};



export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId });
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};
export const deleteReview = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
export const updateHelpful = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const { type } = req.body; // "yes" or "no"

    const updateField = type === "yes" ? { $inc: { helpfulYes: 1 } } : { $inc: { helpfulNo: 1 } };

    const updatedReview = await Review.findByIdAndUpdate(reviewId, updateField, { new: true });

    res.status(200).json(updatedReview);
  } catch (err) {
    next(err);
  }
};
