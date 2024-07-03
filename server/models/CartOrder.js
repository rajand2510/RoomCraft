
const mongoose = require('mongoose');

const cartorder = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    title: {
        type: String,
        required: true,
    },
    imgsrc:{
        type:String,
        required:true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    isorder:{
        type:Boolean,
        required:true,
    },
    cartitemId:{
        type:String,
        required:true
    }
})

const CartOrder = mongoose.model('CartOrder', cartorder);

module.exports = CartOrder;