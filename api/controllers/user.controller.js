import User from "../models/user.model.js";
import createError from "../utils/createError.js";

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
    const updateData = {};

    if (req.body.pendingOrders !== undefined) {
      updateData.pendingOrders = req.body.pendingOrders;
    }

    if (req.body.isSeller === true) {
      updateData.isSeller = true;
      updateData.phone = req.body.phone || "";
      updateData.desc = req.body.desc || "";
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return next(createError(404, "User not found!"));
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(createError(500, "Error updating user details"));
  }
};