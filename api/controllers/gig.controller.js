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

  // Log incoming query for debugging
  // console.log("🔍 Received Query Params:", q);

  // Convert min/max to numbers if present, or default
  const min = q.min !== undefined ? Number(q.min) : 0;
  const max = q.max !== undefined ? Number(q.max) : Infinity;

  if (isNaN(min) || isNaN(max)) {
    return res.status(400).json({ error: "Invalid min/max price range" });
  }

  // ✅ Category slug-to-label mapping
  const categoryMap = {
    "graphic-design": "Graphics & Design",
    "video-animation": "Video & Animation",
    "writing-translation": "Writing & Translation",
    "ai-services": "AI Services",
    "digital-marketing": "Digital Marketing",
    "music-audio": "Music & Audio",
    "programming-tech": "Programming & Tech",
    "business": "Business",
    "lifestyle": "Lifestyle",
  };

  // Normalize category from slug (if provided)
  const rawCat = q.cat;
  const mappedCat = rawCat ? categoryMap[rawCat] || rawCat : undefined;

  // Build MongoDB filters dynamically
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(mappedCat && { cat: mappedCat }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
    ...(q.min !== undefined || q.max !== undefined
      ? { price: { $gte: min, $lte: max } }
      : {}),
  };

  // Determine sort field safely
  const sortField = q.sort === "sales" || q.sort === "createdAt" ? q.sort : "createdAt";

  // console.log("✅ Final Filters:", filters);
  // console.log("✅ Sort Field:", sortField);

  try {
    const gigs = await Gig.find(filters)
      .populate("userId", "username img")
      .sort({ [sortField]: -1 });

    // console.log("✅ Number of gigs returned:", gigs.length);
    res.status(200).json(gigs);
  } catch (err) {
    console.error("❌ Error fetching gigs:", err);
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