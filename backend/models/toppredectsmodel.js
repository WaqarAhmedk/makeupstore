const mongoose = require("mongoose");


const   TopProductSchema=new mongoose.Schema({
    categoryid:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"category"
    },
    productid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    createdat:{
      type:Date,
      default:Date.now,
    },

});

const topproductsmodel=mongoose.model("topproduct",TopProductSchema);

module.exports=topproductsmodel;