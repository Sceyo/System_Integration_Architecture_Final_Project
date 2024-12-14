const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
    },
    phone: {
        type: String,
        match: /^[0-9]{10}$/, // Allow only 10-digit numbers since PH uses 10 digits
        default: null,
    },
    address: {
        type: String,
        maxlength: 255,
        default: null,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

customerSchema.index({ email: 1 });

module.exports = mongoose.model('Customer', customerSchema);
