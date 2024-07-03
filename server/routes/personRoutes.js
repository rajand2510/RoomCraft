const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');
const mongoose = require('mongoose');


// POST route to add a person
router.post('/signup', async (req, res) =>{
    try{
        const data = req.body // Assuming the request body contains the person data

        // Create a new Person document using the Mongoose model
        const newPerson = new Person(data);

        // Save the new person to the database
        const response = await newPerson.save();
        console.log('data saved');

        const payload = {
            id: response.id,
            email: response.email
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is : ", token);

        res.status(200).json({response: response, token: token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// Login Route
router.post('/login', async(req, res) => {
    try{
        // Extract email and password from request body
        const {email, password} = req.body;

        // Find the user by email
        const user = await Person.findOne({email: email});

        // If user does not exist or password does not match, return error
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid email or password'});
        }

        // generate Token 
        const payload = {
            id: user.id,
            email: user.email
        }
        const token = generateToken(payload);

        // resturn token as response
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Assuming you have a separate Mongoose model for items (e.g., Item)
router.get('/users/:id', async (req, res) => {
    try {
      // Extract user ID from request parameter
      const _id = req.params.id;
  
      // Validate user ID (optional for security and robustness)
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }
  
      // Find user by ID using Mongoose
      const user = await Person.findById(_id);
  
      // Handle user not found (optional for improved user experience)
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Send successful response with user details (exclude password)
      res.status(200).json({ user: { name: user.name, email: user.email, mobile: user.mobile, address: user.address } });
    } catch (err) {
      console.error('Error retrieving user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  

// GET method to get the person
router.get('/', jwtAuthMiddleware, async (req, res) =>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/:workType', async(req, res)=>{
    try{
        const workType = req.params.workType; // // Extract the work type from the URL parameter
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter' ){
            const response = await Person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid work type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.put('/:id', async (req, res)=>{
    try{
        const personId = req.params.id; // Extract the id from the URL parameter
        const updatedPersonData = req.body; // Updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const personId = req.params.id; // Extract the person's ID from the URL parameter
        
        // Assuming you have a Person model
        const response = await Person.findByIdAndRemove(personId);
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log('data delete');
        res.status(200).json({message: 'person Deleted Successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


module.exports = router;