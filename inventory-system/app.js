const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middlewares/errorHandler'); // Error handling middleware

const app = express();

// Middleware
app.use(express.json());

// Database Connection
mongoose
    .connect('mongodb://localhost:27017/inventory', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to Inventory Database'))
    .catch((err) => console.error('Database connection error:', err));

// Routes
app.use('/products', productRoutes);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
