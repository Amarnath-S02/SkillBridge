import User from "../models/user.model.js"; 
import createError from "../utils/createError.js"; // Ensure the correct path
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res,next) => {
    try {
        const hash=bcrypt.hashSync(req.body.password,5)
        const { username, email, password, country } = req.body;

        // Check if the user already exists
        // const existingUser = await User.findOne({ username });
        // if (existingUser) {
        //     return res.status(400).send({ message: "Username already exists" });
        // }

        const newUser = new User({
           ...req.body,
            password:hash,
           
        });

        await newUser.save();
        res.status(201).send("User has been created");
    } catch (error) {
       next(error)
    }
};






export const login = async (req, res,next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
      
        if (!user) {
            return next(createError(404,"User not found!"));
        }
        const isCorrect = bcrypt.compareSync(req.body.password, user.password);

        if (!isCorrect) {
            return next(createError(400,"Wrong password or Username!"));
            //res.status(400).send();
        }
       
        const token=jwt.sign({
            id:user._id,
            isSeller:user.isSeller,

        },process.env.JWT_KEY)

        // Exclude password from response
        const { password, ...info } = user._doc
        
        res.cookie("accessToken",token,{httpOnly:true,}).status(200).send(info);

    } catch (error) {
        next(error);
            //"Something went wrong", error: error.message });
    }
};



export const logout = async (req, res) => {
    res.clearCookie("accessToken",{
       sameSites:"none" ,
       secure:true,
    }).status(200).send("User have been logged out.");
    // try {
    //     res.send("from controller");
    // } catch (error) {
    //     res.status(400).send("something went wrong");
    // }
};


