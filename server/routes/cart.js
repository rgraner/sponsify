const express = require('express');
const router = express.Router();
const dbCart = require('../controllers/cart');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/user/:userId', authMiddleware, dbCart.getCartItem);
router.post('/user/:userId', dbCart.addToCart);
router.delete('/user/:userId', dbCart.deleteCartItem);


module.exports = router;