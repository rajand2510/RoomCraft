const express = require('express');
const router = express.Router();
const OrderDone = require('../models/OrderDone');
//


router.get('/orderlist', async (req, res) =>{
    try{
        const data = await OrderDone.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;