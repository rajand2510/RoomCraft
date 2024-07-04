const mongoose = require('mongoose');



const orderdone = new mongoose.Schema({
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
    orderId: {
        type: String,
        required: true,
    }
})
const OrderDone = mongoose.model('OrderDone', orderdone);

module.exports = OrderDone;