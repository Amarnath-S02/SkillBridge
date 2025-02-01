import mongoose from "mongoose";
const {Schema} =mongoose;

const OrderSchema= new Schema({
    gigId:{
        type:String,
        required:true,
      },
    img:{
        type:String,
        required:false,
    },
    title:{
        type:String,
        required:false,
    },
    price:{
        type:String,
        required:false,
    },
    sellerId:{
        type:String,
        required:true,
    },
   buyerId:{
        type:String,
        required:true,
    },
  isCompleted:{
        type:Boolean,
        default:false,
    },
   payment_intent:{
        type:Boolean,
        default:false,
    },  

},{
    timestamps:true
});
export default mongoose.model("Order",OrderSchema)