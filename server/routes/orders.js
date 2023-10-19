const express = require('express');
const router = express.Router();
const dbOrders = require('../controllers/orders');


router.get('/', dbOrders.getAllOrders);
router.get('/:orderId', dbOrders.getOrderById);
router.get('/sponsor/:sponsorId', dbOrders.getOrdersBySponsorId);
router.get('/project/:projectId', dbOrders.getOrdersByProjectId);
router.post('/:userId/:stripeLookupKey/:stripeSubscriptionId', dbOrders.createOrder);
router.put('/:orderId', dbOrders.updateOrder);


module.exports = router;