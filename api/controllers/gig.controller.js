
import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";
import User from "../models/user.model.js";

export const createGig = async (req, res, next) => {
  if (!req.isSeller) {
    return next(createError(403, "Only sellers can create a gig!"));
  }

  const newGig = new Gig({
    userId: req.user.id, // ✅ Ensure correct userId
    ...req.body,
  });

  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    next(err);
  }
};

export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "Gig not found!"));

    if (gig.userId.toString() !== req.user.id) { // ✅ Convert ObjectId to string
      return next(createError(403, "You can delete only your gig!"));
    }

    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted!");
  } catch (err) {
    next(err);
  }
};

export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id).populate("userId", "username img"); // ✅ Populate user details
    if (!gig) return next(createError(404, "Gig not found!"));
    
    res.status(200).json(gig);
  } catch (err) {
    next(err);
  }
};

export const getGigs = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gte: q.min }), // ✅ Use $gte (greater than or equal to)
        ...(q.max && { $lte: q.max }), // ✅ Use $lte (less than or equal to)
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };

  try {
    const gigs = await Gig.find(filters).populate("userId", "username img").sort({ [q.sort]: -1 });
    res.status(200).json(gigs);
  } catch (err) {
    next(err);
  }
};

export const getAllGigs = async (req, res, next) => {
  try {
    const gigs = await Gig.find().populate("userId", "username img"); // ✅ Populate user data
    res.status(200).json(gigs);
  } catch (error) {
    next(createError(500, "Error fetching gigs"));
  }
};


