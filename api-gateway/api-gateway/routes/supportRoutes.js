const express = require('express');
const proxy = require('express-http-proxy');
const router = express.Router();

const SUPPORT_SERVICE_URL = 'http://localhost:3003';

router.use(
    '/',
    proxy(SUPPORT_SERVICE_URL, {
        proxyReqPathResolver: (req) => req.url,
        proxyErrorHandler: (err, res, next) => {
            console.error('Error proxying to Support System:', err.message);
            res.status(500).json({ error: 'Support system is unavailable.' });
        },
    })
);

module.exports = router;
