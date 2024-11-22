// server.js (API Gateway)
const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
const helmet = require('helmet');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(morgan('dev')); // Logging
app.use(helmet()); // Security headers

// Authentication Middleware
const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (token === 'Bearer YOUR_SECRET_TOKEN') {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// Routes
app.get('/crm/customers', authenticate, async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3001/customers');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'CRM System is down' });
    }
});

app.get('/inventory/products', authenticate, async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3002/products');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Inventory System is down' });
    }
});

app.get('/support/tickets', authenticate, async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3003/tickets');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Support System is down' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`API Gateway running on http://localhost:${PORT}`);
});
