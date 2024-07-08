const express = require('express');
const app = express();
const db = require('./db'); // Ensure this path is correct
require('dotenv').config();
const cors = require('cors');
const passport = require('./auth');
const bodyParser = require('body-parser');
const os = require('os');
const winston = require('winston');//os data
const path = require('path'); //os data
const fs = require('fs');//os data

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////



const Razorpay = require('razorpay');


const razorpay = new Razorpay({
  key_id: 'rzp_test_AfONR4lsl3UPRI',
  key_secret: 'vmvaLRN44fu7HfjjG731taaD',
});

app.post('/createOrder', async (req, res) => {
  const { amount, currency, receipt } = req.body;

  try {
    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency,
      receipt,
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});



///////////////////////////////////////////////////////////////////////////////////////////////////////////

//os data

const logDirectory = path.join(__dirname, 'logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: path.join(logDirectory, 'system-data.log') })
  ]
});


app.get('/api/system-data', (req, res) => {
  const systemData = {
    platform: os.platform(),
    type: os.type(),
    arch: os.arch(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    uptime: os.uptime(),
    hostname: os.hostname(),
    networkInterfaces: os.networkInterfaces()
  };

  // Log system data
  logger.info(systemData);

  res.json(systemData);
});




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
