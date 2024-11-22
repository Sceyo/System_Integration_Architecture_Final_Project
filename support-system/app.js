const express = require('express');
const connectDB = require('./config/db'); // Database connection
const ticketRoutes = require('./routes/ticketRoutes'); // Ticket routes

const app = express();
app.use(express.json());

// Connect to the database
connectDB();

// API routes
app.use('/tickets', ticketRoutes);

// Health check endpoint
app.get('/', (req, res) => {
    res.send('Support System is running');
});

// Start the server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Support System is running on port ${PORT}`);
});
