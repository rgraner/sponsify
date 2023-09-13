const express = require('express');
const router = express.Router();
const dbPayment = require('../controllers/payment');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/create-checkout-session', authMiddleware, dbPayment.createCheckoutSession);
router.post('/create-portal-session', dbPayment.createPortalSession);
router.post('/webhook', dbPayment.webhook);


module.exports = router;