const express = require('express');
const proxy = require('express-http-proxy');
const router = express.Router();
const authenticate = require('../middlewares/authenticate'); // Middleware for authentication
const logger = require('../middlewares/logger'); // Middleware for logging

// Use environment variable for the Support System URL
const SUPPORT_SERVICE_URL = process.env.SUPPORT_SERVICE_URL || 'http://localhost:3003';

// Middleware: Authentication (to secure support routes)
router.use(authenticate);

// Middleware: Logging all requests to Support routes
router.use((req, res, next) => {
    logger.info(`Support route accessed: ${req.method} ${req.originalUrl}`);
    next();
});

// Proxy requests to the Support System
router.use(
    '/',
    proxy(SUPPORT_SERVICE_URL, {
        proxyReqPathResolver: (req) => {
            // Forward the entire path as-is with query parameters
            return req.url;
        },
        proxyErrorHandler: (err, res, next) => {
            logger.error(`Error proxying to Support System: ${err.message}`);
            res.status(500).json({ error: 'Support system is currently unavailable.' });
        },
    })
);

// Health Check Endpoint
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'Support system proxy is healthy' });
});

module.exports = router;
