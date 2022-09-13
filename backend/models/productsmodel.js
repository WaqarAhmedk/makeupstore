const mongoose = require("mongoose");


const   ProductSchema=new mongoose.Schema({
    categoryid:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"category"
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
    total:{
        type:Number,
        required:true,
    },
    available:{
        type:Number,
        required:true,
    },
    sold:{
        type:Number,
        default:0,
    },
    createdat:{
      type:Date,
      default:Date.now,
    },

});

const productsmodel=mongoose.model("product",ProductSchema);

module.exports=productsmodel;