const express = require('express');
const router = express.Router();
const dbSponsors = require('../controllers/sponsors');


router.get('/', dbSponsors);

module.exports = router;