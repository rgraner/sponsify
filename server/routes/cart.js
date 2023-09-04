const express = require('express');
const router = express.Router();
const dbCart = require('../controllers/cart');


router.get('/user/:userId', dbCart.getCartItem);
router.post('/user/:userId', dbCart.addToCart);
router.delete('/user/:userId', dbCart.deleteCartItem);


module.exports = router;