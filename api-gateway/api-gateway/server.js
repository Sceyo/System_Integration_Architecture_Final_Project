const express = require('express');
const promClient = require('prom-client');
const logger = require('../middlewares/logger'); // Shared logger
const authenticate = require('../middlewares/authenticate'); // Authentication middleware
const crmRoutes = require('./routes/crmRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const supportRoutes = require('./routes/supportRoutes');
const app = express();

// Initialize Prometheus registry
const register = new promClient.Registry();

// Define a metric for requests to the API Gateway
const apiGatewayRequestCounter = new promClient.Counter({
    name: 'api_gateway_requests',
    help: 'Total number of requests to the API Gateway',
    labelNames: ['status', 'route'],
});

// Register the metric
register.registerMetric(apiGatewayRequestCounter);

// Middleware to increment the request counter
app.use((req, res, next) => {
    res.on('finish', () => {
        apiGatewayRequestCounter.labels(res.statusCode, req.path).inc();
    });
    next();
});

// Prometheus /metrics endpoint
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

// Apply middleware
app.use(authenticate); // Secures the gateway

// Use modular routes
app.use('/api/crm', crmRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/support', supportRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
    logger.info(`API Gateway is running on port ${port}`);
});
