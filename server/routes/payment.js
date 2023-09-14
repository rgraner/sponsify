const express = require('express');
const router = express.Router();
const dbPayment = require('../controllers/payment');


router.post('/:userId/create-checkout-session', dbPayment.createCheckoutSession);
router.post('/create-portal-session', dbPayment.createPortalSession);
router.post('/webhook', dbPayment.webhook);


module.exports = router;