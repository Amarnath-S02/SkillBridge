import User from "../models/user.model.js"; 
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ✅ User Registration
export const register = async (req, res, next) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, 10);

        const newUser = new User({
            ...req.body,
            password: hash,
        });

        await newUser.save();
        res.status(201).json({ message: "User has been created" });
    } catch (error) {
        next(error);
    }
};

// ✅ User Login
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return next(createError(404, "User not found!"));
        }

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);

        if (!isCorrect) {
            return next(createError(400, "Wrong password or Username!"));
        }

        const token = jwt.sign(
            { id: user._id, isSeller: user.isSeller },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        const { password, ...info } = user._doc;

        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None"
        }).status(200).json(info);
    } catch (error) {
        next(error);
    }
};

// ✅ User Logout
export const logout = (req, res) => {
    try {
        res.clearCookie("accessToken", {
            sameSite: "None",
            secure: process.env.NODE_ENV === "production",
            httpOnly: true
        });

        res.status(200).json({ message: "User has been logged out." });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

export const loginAdmin = async (req, res) => {
  try {
      const { email, password } = req.body;

      if (!email || !password) {
          return res.status(400).json({ message: "Email and password are required" });
      }

      const admin = await User.findOne({ email });

      if (!admin || !admin.isAdmin) {
          return res.status(401).json({ message: "Access Denied: Not an Admin" });
      }

      const isMatch = bcrypt.compareSync(password, admin.password);
      if (!isMatch) {
          return res.status(400).json({ message: "Invalid Credentials" });
      }

      const token = jwt.sign(
          { id: admin._id, isAdmin: true },
          process.env.JWT_KEY,
          { expiresIn: "1d" }
      );

      res.cookie("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

      console.log("Response Headers:", res.getHeaders()); // Log headers

      res.status(200).json({
          message: "Login Successful",
          token,
          admin: { email: admin.email },
      });

  } catch (error) {
      console.error("Login Admin Error:", error); // Log any errors
      res.status(500).json({ message: "Server Error", error });
  }
};