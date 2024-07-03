const express = require('express');
const router = express.Router();
const UserOrder = require('../models/UserOrder');
//



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function checkForDuplicateItem(orderId, userId) {
    // Replace with your actual database query
    try {
      const existingItems = await UserOrder.find({orderId}); // Adapt to your model
      return existingItems.length > 0; // Check if there are existing items
    } catch (err) {
      console.error('Error checking for duplicate item:', err);
      // Handle potential errors during database interaction (adjust based on your needs)
      return false; // Assume no duplicate for now (adjust based on your needs)
    }
  }
  
router.post('/addtocart', async (req, res) => {
    try {
      const data = req.body;
  
      // Check for duplicate item in existing cart entries (implementation details depend on your database)
      const isDuplicate = await checkForDuplicateItem(data.orderId); // Replace with your logic
  
      if (isDuplicate) {
        res.status(400).json({ message: 'Duplicate item in cart' });
        console.log('duplicate order id');

        return; // Exit early to prevent duplicate entry
      }
  
      const newProduct = new UserOrder(data);
      const response = await newProduct.save();
      console.log('data saved to cart');
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      console.log('internal erro')
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////// 


router.get('/cartlist', async (req, res) =>{
    try{
        const data = await UserOrder.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


//
module.exports = router;