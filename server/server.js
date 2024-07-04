const express = require('express');
const app = express();
const db = require('./db'); // Ensure this path is correct
require('dotenv').config();
const cors = require('cors');
const passport = require('./auth');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(bodyParser.json()); // Parse JSON requests

// Log each request to the console
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
  next(); // Move on to the next middleware
};
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', { session: false });


// Import router files
const personRoutes = require('./routes/personRoutes'); // Ensure this path is correct
const productListRoutes = require('./routes/ProductListRoutes'); // Ensure this path is correct
const userorderRoutes = require('./routes/UserOrderRoutes');
const orderdoneRoutes = require('./routes/OrderDoneRoutes');
const cartorderRoutes = require('./routes/CartOrderRoutes')
// Use the routers
app.use('/api/person', personRoutes);
app.use('/api/productlist', productListRoutes);
app.use('/api/userorder', userorderRoutes);
app.use('/api/ordered',orderdoneRoutes);
app.use('/api/cart',cartorderRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
