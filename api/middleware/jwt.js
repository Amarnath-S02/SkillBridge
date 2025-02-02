import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";


export const verifyToken=(req,res,next)=>{
      const token = req.cookies.accessToken;  // Corrected typo from cokkies to cookies
        if (!token) return  next(createError(401,"You are not authenticated!"));



        jwt.verify(token, process.env.JWT_KEY, async (err, payload) => { 
            // Corrected usage of jwt.verify
         if(err) return  next(createError(403,"Token is not value!"));
        
            req.userId=payload.id;
            req.isSeller=payload.isSeller;
            next()
 
        });
}