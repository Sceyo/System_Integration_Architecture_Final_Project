const express = require('express');
const promClient = require('prom-client');
const logger = require('../shared/utils/logger'); // Use shared logger
const app = express();

// Initialize Prometheus registry
const register = new promClient.Registry();

// Define a metric for requests to the API Gateway
const apiGatewayRequestCounter = new promClient.Counter({
    name: 'api_gateway_requests',
    help: 'Total number of requests to the API Gateway',
    labelNames: ['status']
});

// Register the metric
register.registerMetric(apiGatewayRequestCounter);

// Middleware to increment the request counter
app.use((req, res, next) => {
    res.on('finish', () => {
        apiGatewayRequestCounter.labels(res.statusCode).inc();
    });
    next();
});

// Prometheus /metrics endpoint
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

// Example routes for API Gateway
app.get('/api/crm', (req, res) => {
    // Your code for CRM-related functionality
    res.send('CRM data');
});

// Start the server
const port = 3000;
app.listen(port, () => {
    logger.info(`API Gateway is running on port ${port}`);
});
