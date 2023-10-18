const express = require('express');
const router = express.Router();
const dbOrders = require('../controllers/orders');


router.get('/', dbOrders.getAllOrders);
router.get('/:orderId', dbOrders.getOrderById);
router.get('/sponsor/:sponsorId', dbOrders.getOrdersBySponsorId);
router.post('/:userId/:stripeLookupKey/:stripeSubscriptionId', dbOrders.createOrder);
// router.put('/:id', dbOrders.updateProject);
// router.delete('/:id', dbOrders.deleteProject);


module.exports = router;