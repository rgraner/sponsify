const express = require('express');
const router = express.Router();
const dbCheckout = require('../controllers/checkout');


router.post('/sponsor/:sponsorId', dbCheckout.checkout);


module.exports = router;