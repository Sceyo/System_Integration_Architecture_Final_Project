const express = require('express');
const router = express.Router();
const InventoryService = require('../services/inventoryService');

// Get all products
router.get('/', async (req, res) => {
    const products = await InventoryService.getAllProducts();
    res.json(products);
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
    const product = await InventoryService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
});

// Create a new product
router.post('/', async (req, res) => {
    const product = await InventoryService.createProduct(req.body);
    res.status(201).json(product);
});

// Update an existing product
router.put('/:id', async (req, res) => {
    const product = await InventoryService.updateProduct(req.params.id, req.body);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
});

// Delete a product
router.delete('/:id', async (req, res) => {
    const result = await InventoryService.deleteProduct(req.params.id);
    if (!result) return res.status(404).json({ message: 'Product not found' });
    res.status(204).send();
});

module.exports = router;
