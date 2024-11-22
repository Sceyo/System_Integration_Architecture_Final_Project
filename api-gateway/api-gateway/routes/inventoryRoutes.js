const express = require('express');
const proxy = require('express-http-proxy');
const router = express.Router();
const logger = require('../middlewares/logger'); // Logging middleware, if you have it

// Base URL of the Inventory System
const INVENTORY_SERVICE_URL = 'http://localhost:3002'; // Change the port if your Inventory System runs elsewhere

// Middleware for logging inventory requests (optional)
router.use((req, res, next) => {
    console.log(`Inventory route accessed: ${req.method} ${req.originalUrl}`);
    next();
});

// Proxy all requests targeting this route to the Inventory System
router.use(
    '/',
    proxy(INVENTORY_SERVICE_URL, {
        proxyReqPathResolver: (req) => {
            // Dynamically determine the path to forward, keeping the original query params
            return req.url; // Forward the entire path as-is
        },
        proxyErrorHandler: (err, res, next) => {
            console.error('Error occurred while proxying request:', err.message);
            res.status(500).json({ error: 'Inventory system is currently unavailable.' });
        },
    })
);

module.exports = router;
