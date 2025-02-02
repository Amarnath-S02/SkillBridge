import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js"
import authRoute from "./routes/auth.route.js"
import cookieParser from "cookie-parser";

const app=express();
app.use(express.json());


dotenv.config();
const connect = async()=>{
    try{
    await  mongoose.connect(process.env.MONGO)
    console.log("connected to mongodb") 
}
 catch(error){
    console.log(error)
 }
};

app.use(cookieParser());

app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/gigs",gigRoute)
app.use("/api/order",orderRoute)
app.use("/api/conversation",conversationRoute )
app.use("/api/message",messageRoute)
app.use("/api/reviews",reviewRoute)

app.use((err,req,res,next)=>{

    const errorStatus =err.status || 500
    const errorMessage  =err.message || "Something went Wrong!"


 return res.status(errorStatus ).send(errorMessage);

})

app.listen(3000,()=>{
    connect()
    console.log("server is Running on 3000!")
})