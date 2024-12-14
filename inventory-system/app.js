const express = require('express');
const connectDB = require('./config/db'); // Importing the connectDB function
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middlewares/errorHandler'); // Error handling middleware

const app = express();

// Middleware
app.use(express.json());

// Connect to the database
connectDB(); // Calling the connectDB function to establish a connection

// Routes
app.use('/products', productRoutes);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
