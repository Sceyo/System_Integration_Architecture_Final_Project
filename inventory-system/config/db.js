const mongoose = require('mongoose');

// MongoDB connection string from environment variable or fallback to local MongoDB
const DB_URI = process.env.INVENTORY_DB_URI || 'mongodb://localhost:27017/inventory-db';

const connectDB = async () => {
    try {
        // Connect to MongoDB with the provided URI
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to Inventory Database successfully');
    } catch (error) {
        console.error('Error connecting to Inventory Database:', error.message);
        process.exit(1); 
    }
};

module.exports = connectDB;
