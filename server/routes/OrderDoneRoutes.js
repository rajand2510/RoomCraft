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

router.get('/myordered', async (req, res) =>{
    try{
        const userId = req.query.userId; 
        const data = await OrderDone.find({ userId: userId });
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


router.post('/orderitem', async (req, res) => {
    try {
      const orderItems = req.body;
      const orderDones = await Promise.all(orderItems.map((orderItem) => {
        const orderDone = new OrderDone(orderItem);
        return orderDone.save();
      }));
      res.status(200).send(orderDones);
    } catch (error) {
      console.error(error);
      res.status(400).send({ message: 'OrderDone validation failed' });
    }
  });
module.exports = router;