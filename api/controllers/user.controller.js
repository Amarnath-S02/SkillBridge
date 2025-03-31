import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, "User not found!"));

    if (req.userId !== user._id.toString() && !req.isAdmin) {
      return next(
        createError(
          403,
          "Unauthorized! Only the account owner or an admin can delete this user."
        )
      );
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).send(user);
};


export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    let updateData = req.body;

    if (req.file) {
      updateData.img = `uploads/${req.file.filename}`; // Store uploaded image path
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      return next(createError(404, "User not found!"));
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(createError(500, "Error updating user details"));
  }
};
export const becomeSeller = async (req, res, next) => {
  try {
    console.log("User ID in request:", req.userId); // Debugging user ID
    console.log("Received data:", req.body); // Debugging request body

    if (!req.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: Missing user ID" });
    }

    const { username, img, phone, description } = req.body;

    // Ensure username is unique (only if changed)
    const existingUser = await User.findOne({ username });
    if (existingUser && existingUser._id.toString() !== req.userId) {
      return res.status(400).json({ success: false, message: "Username already taken" });
    }

    // Update user details (Fix `desc` field)
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { username, img, phone, desc: description, isSeller: true },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "Seller profile updated", user: updatedUser });
  } catch (error) {
    console.error("Error in becomeSeller API:", error);
    res.status(500).json({ success: false, message: "Error updating seller profile", error });
  }
};




