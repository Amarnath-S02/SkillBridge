import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken; // Ensure the token is being received properly

  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    if (err) return next(createError(403, "Token is not valid!"));

    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    req.isAdmin = payload.isAdmin; // Make sure admin property is included in the payload
    next();
  });
};

// ✅ Verify Admin Middleware (No Authentication for Admin)
export const verifyAdmin = (req, res, next) => {
  console.log("Admin access granted without authentication.");
  req.isAdmin = true; // Force admin access
  next();
};
