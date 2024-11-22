const express = require('express');
const router = express.Router();

router.get('/products', (req, res) => {
    res.json({ message: 'Fetching products from Inventory system' });
});

module.exports = router;
