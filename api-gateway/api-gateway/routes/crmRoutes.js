const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const router = express.Router();

// Forward requests to the CRM microservice
router.use(
    '/customers',
    createProxyMiddleware({
        target: 'http://localhost:3001', // Replace with the CRM microservice's actual URL
        changeOrigin: true,
        pathRewrite: {
            '^/api/crm': '', // Removes '/api/crm' from the forwarded path
        },
    })
);

module.exports = router;
