const mongoose = require('mongoose');

const productList = new mongoose.Schema({
    id:{
        type:Number,
        required:true,
    },
    title: {
        type: String,
        required: true,
    },
    discription: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imgsrc:{
        type:String,
        required:true,
    },
    gltfPath:{
        type:String,
        required:true,
    },
    imgsrc:{
        type:String,
        required:true,
    },
    initialScale:{
        type:String,
        required:true,
    },
    positionY:{
        type:String,
        required:true,
    },
    productCategory:{
        type:String,
        required:true,
    },
})

const ProductList = mongoose.model('ProductList', productList);

module.exports = ProductList;