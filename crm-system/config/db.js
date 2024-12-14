require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: process.env.NODE_ENV === 'production', // Use SSL in production
    poolSize: 10, // Connection pool settings
});

mongoose.connection.on('connected', () => {
    console.log('Connected to CRM database');
});

mongoose.connection.on('error', (err) => {
    console.error('Database connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.warn('Database connection lost');
});

module.exports = mongoose;
