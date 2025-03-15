
import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";
import User from "../models/user.model.js";

export const createGig = async (req, res, next) => {
  // Use req.isSeller instead of req.user.isSeller
  if (!req.isSeller) {
    return next(createError(403, "Only sellers can create a gig!"));
  }

  const newGig = new Gig({
    userId: req.userId, // Use req.userId from the JWT payload
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
    if (gig.userId !== req.userId)
      return next(createError(403, "You can delete only your gig!"));

    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted!");
  } catch (err) {
    next(err);
  }
};

export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) next(createError(404, "Gig not found!"));
    res.status(200).send(gig);
  } catch (err) {
    next(err);
  }
};
export const deleteGigByAdmin = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "Gig not found!"));

    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted by admin!");
  } catch (err) {
    next(err);
  }
};

export const getGigs = async (req, res, next) => {
  const q = req.query;

  // ✅ Log query params for debugging
  console.log("Received Query Params:", q);

  // ✅ Convert min/max to numbers and set defaults
  const min = q.min ? Number(q.min) : 0; // Default min: 0
  const max = q.max ? Number(q.max) : Infinity; // Default max: Infinity

  console.log("Processed Min:", min, "Max:", max); // Debugging

  // ✅ Apply filters
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
    ...(q.min || q.max ? { price: { $gte: min, $lte: max } } : {}), // Apply only if min/max exist
  };

  console.log("Final Filters Applied:", JSON.stringify(filters, null, 2)); // Debugging

  try {
    const gigs = await Gig.find(filters)
      .populate("userId", "username img")
      .sort({ [q.sort]: -1 });

    console.log("Number of gigs found:", gigs.length);

    res.status(200).json(gigs);
  } catch (err) {
    console.error("Error fetching gigs:", err);
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


