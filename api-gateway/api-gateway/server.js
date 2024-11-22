const express = require('express');
const crmRoutes = require('./routes/crmRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const supportRoutes = require('./routes/supportRoutes');
const authenticate = require('./middlewares/authenticate');
const logger = require('./middlewares/logger');

const app = express();
app.use(express.json());
app.use(logger);
app.use(authenticate);

app.use('/crm', crmRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/support', supportRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
