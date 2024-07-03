
const mongoose = require('mongoose');

const userorder = new mongoose.Schema({
    userid:{
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
    orderId: {
        type: String,
        required: true,
        unique: true
    }
})

const UserOrder = mongoose.model('UserOrder', userorder);

module.exports = UserOrder;