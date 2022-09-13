const mongoose = require("mongoose");

const PendingCoustmerSchema = new mongoose.Schema({
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

const pendingcoustmermodel=mongoose.model("pendingcostumer", PendingCoustmerSchema);

module.exports =pendingcoustmermodel;