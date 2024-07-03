const express = require('express');
const router = express.Router();
const CartOrder = require('../models/CartOrder');

router.post('/addcart', async (req, res) =>{
    try{
        const data = req.body
        const newCart = new CartOrder(data);
        const response = await newCart.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


router.get('/cartlist', async (req, res) => {
  try {
      const userId = req.query.userId;
      const cartitemId = req.query.cartitemId;

      const data = await CartOrder.find({ userId, cartitemId });
      console.log(data);
      res.status(200).json(data);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/cart_count', async (req, res) => {
    try {
      const userId = req.query.userId;
      if (!userId) {
        return res.status(400).json({ error: 'Missing userId parameter' });
      }
      const count = await CartOrder.countDocuments({ userId });
      res.status(200).json({ count });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve cart count' });
    }
  });

  router.get('/checkout', async (req, res) =>{
    try{
        const userId = req.query.userId; 
        const data = await CartOrder.find({ userId: userId });
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


router.delete('/cartdelete', async (req, res) => {
    try {
      const _id = req.query._id;
      const deletedOrder = await CartOrder.findByIdAndRemove(_id);
      if (!deletedOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  module.exports = router;