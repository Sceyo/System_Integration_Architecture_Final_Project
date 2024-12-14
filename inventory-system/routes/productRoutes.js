const express = require('express');
const router = express.Router();
const InventoryService = require('../services/inventoryService');
const authMiddleware = require('../middleware/authMiddleware');
const errorHandler = require('../middleware/errorHandler');

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Get all products
router.get('/', async (req, res, next) => {
    try {
        const products = await InventoryService.getAllProducts();
        res.json(products);
    } catch (err) {
        next(err); // Pass error to the error handler middleware
    }
});

// Get a single product by ID
router.get('/:id', async (req, res, next) => {
    try {
        const product = await InventoryService.getProductById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        next(err); // Pass error to the error handler middleware
    }
});

// Create a new product
router.post('/', async (req, res, next) => {
    try {
        const product = await InventoryService.createProduct(req.body);
        res.status(201).json(product);
    } catch (err) {
        next(err); // Pass error to the error handler middleware
    }
});

// Update an existing product
router.put('/:id', async (req, res, next) => {
    try {
        const product = await InventoryService.updateProduct(req.params.id, req.body);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        next(err); // Pass error to the error handler middleware
    }
});

// Delete a product
router.delete('/:id', async (req, res, next) => {
    try {
        const result = await InventoryService.deleteProduct(req.params.id);
        if (!result) return res.status(404).json({ message: 'Product not found' });
        res.status(204).send();
    } catch (err) {
        next(err); // Pass error to the error handler middleware
    }
});

// Error handling middleware for catching any unexpected errors
router.use(errorHandler);

module.exports = router;
