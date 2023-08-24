const express = require('express');
const router = express.Router();
const dbCart = require('../controllers/cart');


router.get('/sponsor/:sponsorId', dbCart.getCartItem);
router.post('/add', dbCart.addToCart);
router.delete('/:cartId', dbCart.deleteCartItem);


module.exports = router;