const mongoose = require("mongoose");


const   CategorySchema=new mongoose.Schema({
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

const categorymodel=mongoose.model("category",CategorySchema);

module.exports=categorymodel;