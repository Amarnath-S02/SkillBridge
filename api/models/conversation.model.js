import mongoose from "mongoose";
const {Schema} =mongoose;

const ConversationSchema= new Schema({
   id:{
        type:String,
        required:true,
        unique:true
    },
    sellerId:{
        type:String,
        required:true,

    },
    buyerId:{
        type:String,
        required:true,

    },
    readByseller:{
        type:Boolean,
        required:true,

    },
    readByBuyer:{
        type:Boolean,
        required:true,

    },
    lastMessage:{
        type:Boolean,
        required:false,

    },
    
  
   

},{
    timestamps:true
});
export default mongoose.model("Conversation",ConversationSchema)