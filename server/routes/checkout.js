const express = require('express');
const router = express.Router();
const dbCheckout = require('../controllers/checkout');
// const authMiddleware = require('../middlewares/authMiddleware');


router.post('/', dbCheckout.checkout);


module.exports = router;