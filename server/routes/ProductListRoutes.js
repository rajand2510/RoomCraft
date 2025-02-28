const express = require('express');
const router = express.Router();
const ProductList = require('../models/ProductList');

// POST Method to add a Product Item
router.post('/addproducts', async (req, res) => {
  try {
      const { id, title, discription, price, imgsrc, gltfPath, initialScale, positionY, productCategory } = req.body;

      // Check if any required field is missing
      if (!id || !title || !discription || !price || !imgsrc || !gltfPath || !initialScale || !positionY || !productCategory) {
          return res.status(400).json({ error: 'All fields are required' });
      }

      // Create a new product instance
      const newProduct = new ProductList({
          id,
          title,
          discription,
          price,
          imgsrc,
          gltfPath,
          initialScale,
          positionY,
          productCategory
      });

      // Save the new product to the database
      await newProduct.save();

      console.log('New product added');
      res.status(201).json(newProduct);  // Respond with the newly added product
  } catch (err) {
      console.error('Error adding product:', err);
      res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});


// GET method to get the Product Items
router.get('/products', async (req, res) =>{
    try{
        const data = await ProductList.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})



// router.get('/:taste', async (req, res) =>{
//     try{
//         const tasteType = req.params.taste; // // Extract the taste type from the URL parameter
//         if(tasteType == 'sweet' || tasteType == 'sour' || tasteType == 'spicy' ){
//             const response = await ProductList.find({taste: tasteType});
//             console.log('response fetched');
//             res.status(200).json(response);
//         }else{
//             res.status(404).json({error: 'Invalid Taste type'});
//         }
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error: 'Internal Server Error'});
//     }
// })

// router.put('/:id', async (req, res)=>{
//     try{
//         const ProductId = req.params.id; // Extract the id of Product Item from the URL parameter
//         const updatedProductData = req.body; // Updated data for the Product Item

//         const response = await ProductList.findByIdAndUpdate(ProductId, updatedProductData, {
//             new: true, // Return the updated document
//             runValidators: true, // Run Mongoose validation
//         })

//         if (!response) {
//             return res.status(404).json({ error: 'Product Item not found' });
//         }

//         console.log('data updated');
//         res.status(200).json(response);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error: 'Internal Server Error'});
//     }
// })

// router.delete('/:id', async (req, res) => {
//     try{
//         const ProductId = req.params.id; // Extract the Product's ID from the URL parameter
        
//         // Assuming you have a ProductList model
//         const response = await ProductList.findByIdAndRemove(ProductId);
//         if (!response) {
//             return res.status(404).json({ error: 'Product Item not found' });
//         }
//         console.log('data delete');
//         res.status(200).json({message: 'Product Deleted Successfully'});
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error: 'Internal Server Error'});
//     }
// })

// comment added for testing purposes
module.exports = router;