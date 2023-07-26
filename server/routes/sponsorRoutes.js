const express = require('express');
const router = express.Router();

// get all sponsors
router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM sponsors');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });    
    }
});

module.exports = router;
