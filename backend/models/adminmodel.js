const mongoose = require("mongoose");


const AdminSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },

});

const adminmodel=mongoose.model("admin",AdminSchema);

module.exports=adminmodel;