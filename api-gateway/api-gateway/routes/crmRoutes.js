const express = require('express');
const router = express.Router();

router.get('/customers', (req, res) => {
    res.json({ message: 'Fetching customers from CRM system' });
});

module.exports = router;
