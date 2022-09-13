const mongoose = require("mongoose");


const   CartSchema=new mongoose.Schema({
    categoryid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category"
      },
      productid:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"product"
      },
      userid:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"user"
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
      totalprice:{
          type:Number,
          required:true,
      },
      quantity:{
          type:Number,
          required:true,
      },
      grandtotal:{
        type:Number,
        default:0,
      },
      createdat:{
        type:Date,
        default:Date.now,
      },
    

});

const cartmodel=mongoose.model("cart",CartSchema);

module.exports=cartmodel;