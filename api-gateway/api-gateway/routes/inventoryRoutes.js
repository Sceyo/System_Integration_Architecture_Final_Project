const express = require('express');
const proxy = require('express-http-proxy');
const router = express.Router();
const authenticate = require('../middlewares/authenticate'); // Authentication middleware
const logger = require('../middlewares/logger'); // Logging middleware

// Use environment variable for the Inventory System URL
const INVENTORY_SERVICE_URL = process.env.INVENTORY_SERVICE_URL || 'http://localhost:3002';

// Middleware: Authentication (ensure only authorized users access this route)
router.use(authenticate);

// Middleware: Logging requests to Inventory routes
router.use((req, res, next) => {
    logger.info(`Inventory route accessed: ${req.method} ${req.originalUrl}`);
    next();
});

// Proxy all requests targeting this route to the Inventory System
router.use(
    '/',
    proxy(INVENTORY_SERVICE_URL, {
        proxyReqPathResolver: (req) => {
            // Forward the entire path while preserving query parameters
            return req.url; 
        },
        proxyErrorHandler: (err, res, next) => {
            logger.error(`Error occurred while proxying request to Inventory: ${err.message}`);
            res.status(500).json({ error: 'Inventory system is currently unavailable.' });
        },
    })
);

// Health Check Endpoint
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'Inventory system proxy is healthy' });
});

module.exports = router;
