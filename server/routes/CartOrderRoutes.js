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



  module.exports = router;