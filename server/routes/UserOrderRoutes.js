const express = require('express');
const router = express.Router();
const UserOrder = require('../models/UserOrder');
//



// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// async function checkForDuplicateItem(orderId, userId) {
//   try {
//     const existingItem = await UserOrder.findOne({ orderId, userId });
//     return !!existingItem; // Return true if found, false if not found
//   } catch (err) {
//     console.error('Error checking for duplicate item:', err);
//     return false;
//   }
// }

// // Route to add an item to the cart
// router.post('/addtocart', async (req, res) => {
//   try {
//     const data = req.body;

//     // Ensure 'userId' is correctly spelled and sent from the frontend
//     const userId = data.userId; // Correctly access userId from req.body

//     // Check for duplicate item in existing cart entries for the same user
//     const isDuplicate = await checkForDuplicateItem(data.orderId, userId);

//     if (isDuplicate) {
//       res.status(400).json({ message: 'Duplicate item in cart' });
//       console.log('Duplicate orderId for user');
//       return; // Exit early to prevent duplicate entry
//     }

//     // Create a new UserOrder document
//     const newProduct = new UserOrder({
//       userId,
//       title: data.title,
//       imgsrc: data.imgsrc,
//       price: data.price,
//       quantity: data.quantity,
//       isorder: data.isorder,
//       orderId: data.orderId // Assign the orderId from request data
//     });

//     // Save the document to MongoDB
//     const response = await newProduct.save();
//     console.log('Data saved to cart');
//     res.status(200).json(response);
//    } catch (err) {
//     console.error('Error adding item to cart:', err); // Log the error for debugging
//     res.status(500).json({ error: 'Internal Server Error' }); // Return a generic error response
//   }
// });
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

 router.post('/add', async (req, res) =>{
    try{
        const data = req.body
        const newUser = new UserOrder(data);
        const response = await newUser.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


router.get('/list', async (req, res) => {
    try {
      const userId = req.query.userId;
      const orderId = req.query.orderId;
  
      const data = await UserOrder.find({ userId, orderId });
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


//
module.exports = router;