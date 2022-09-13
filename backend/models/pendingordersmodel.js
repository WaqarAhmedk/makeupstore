const mongoose = require("mongoose");


const PendingOrdersSchema = new mongoose.Schema({
    products: [
        {
            productid: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"
            },
            quantity:{
                type:Number,
                required:true,
            }
        }
    ],
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    grandtotal: {
        type: Number,
        default: 0,
    },
    status:{
        type:String,
        default:'pending',
    },
    createdat: {
        type: Date,
        default: Date.now,
    },


});

const pendingordermodel = mongoose.model("pendingorder", PendingOrdersSchema);

module.exports = pendingordermodel;