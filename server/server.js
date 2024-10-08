require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db.js');
const port = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.get('/', (req, res) => {
  res.send('Hello World');
});
//db connection
connectDB();

//api endpoint
app.use('/api/food', require('./routes/foodRoute.js'));
app.use('/api/food:id', require('./routes/foodRoute.js'));
app.use('/api/food/update:id', require('./routes/foodRoute.js'));

app.use('/images', express.static('uploads'));
app.use('/api/user', require('./routes/userRoute.js'));
app.use('/api/cart', require('./routes/cartRoute.js'));
app.use('/api/order', require('./routes/orderRoute.js'));
app.use('/api/order/list', require('./routes/orderRoute.js'));
app.use('/api/order/status', require('./routes/orderRoute.js'));
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
