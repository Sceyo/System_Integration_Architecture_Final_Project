const express = require('express');
const router = express.Router();

router.get('/tickets', (req, res) => {
    res.json({ message: 'Fetching tickets from Support system' });
});

module.exports = router;
