const express = require('express');
const promClient = require('prom-client');
const logger = require('../shared/utils/logger');
const app = express();

// Initialize Prometheus registry
const register = new promClient.Registry();

// Define a metric for requests to the CRM system
const crmSystemRequestCounter = new promClient.Counter({
    name: 'crm_system_requests',
    help: 'Total number of requests to the CRM system',
    labelNames: ['status']
});

// Register the metric
register.registerMetric(crmSystemRequestCounter);

// Middleware to increment the request counter
app.use((req, res, next) => {
    res.on('finish', () => {
        crmSystemRequestCounter.labels(res.statusCode).inc();
    });
    next();
});

// Prometheus /metrics endpoint
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

// Example routes for CRM System
app.get('/api/customers', (req, res) => {
    // Your code for CRM-related functionality
    res.send('Customer data');
});

// Start the server
const port = 3001;
app.listen(port, () => {
    logger.info(`CRM System is running on port ${port}`);
});
