const mongoose = require("mongoose");

// Order Schema
const orderSchema = new mongoose.Schema({
    shippingInfo : {
        address : {
            type : String,
            required : true,
        },
        city : {
            type : String,
            required : true,
        },
        phone : {
            type : String,
            required : true,
        },
        postalCode : {
            type : String,
            required : true,
        },
        country : {
            type : String,
            required : true,
        },
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    orderItems : [
        {
            name : {
                type : String,
                required : true,
            },
            quantity : {
                type : Number,
                required : true,
            },
            price : {
                type : Number,
                required : true,
            },
            image : {
                type : String,
                required : true,
            },
            product : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Product",
                required : true,
            }
        }
    ],
    paidAt : {
        type : Date,
    },
    paymentInfo : {        
        id : {
            type : String
        },       
        status : {
            type : String,
        }
    },
    itemsPrice : {
        type : Number,
        required : true,        
        default : 0.00,
    },
    taxPrice : {
        type : Number,
        required : true,
        default : 0.00,
    },
    shippingPrice : {
        type : Number,
        required : true,
        default : 0.00,
    },
    totalPrice : {
        type : Number,
        required : true,
        default : 0.00,
    },
    orderStatus : {
        type : String,
        required : true,
        default : "processing",
    },
    deliveredAt : {
        type : Date
    }

}, { timestamps : true })

module.exports = mongoose.model('Order', orderSchema)