const mongoose = require("mongoose");

const CoustmerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true,

    },
    password: {
        type: String,
        required: true,
    },
    phno:{
        type:String,
        required:true,
    },
    createdat: {
        type: Date,
        default: Date.now
    }
});

const coustmermodel=mongoose.model("costumer", CoustmerSchema);

module.exports =coustmermodel;