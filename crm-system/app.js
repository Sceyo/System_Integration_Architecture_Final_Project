const express = require('express');
const customerRoutes = require('./routes/customerRoutes');
require('./config/db'); // Connects to the database

const app = express();
app.use(express.json());
app.use('/customers', customerRoutes);

const PORT = 3001;
app.listen(PORT, () => console.log(`CRM system running on port ${PORT}`));
