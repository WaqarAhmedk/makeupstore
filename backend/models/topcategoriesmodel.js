const mongoose = require("mongoose");


const   TopCategorySchema=new mongoose.Schema({
    categoryid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category"
    },
    name:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true,
    },
    createdat:{
      type:Date,
      default:Date.now,
    },

});

const topcategorymodel=mongoose.model("topcategory",TopCategorySchema);

module.exports=topcategorymodel;