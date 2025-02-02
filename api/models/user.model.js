import mongoose from "mongoose";
const {Schema} =mongoose;

const userSchema= new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    img:{
        type:String,
        required:false,
    },
    Country:{
        type:String,
        required:false,
    },
   phone:{
        type:String,
        required:false,
    },
    password:{
        type:String,
        required:true,
    },

    desc:{
        type:String,
        required:false,
    },
    isSeller:{
        type:Boolean,
       default:false,
    },
   

},{
    timestamps:true
});
export default mongoose.model("user",userSchema)