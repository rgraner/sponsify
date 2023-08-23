const express = require('express');
const router = express.Router();
const dbPlans = require('../controllers/plans');


router.get('/project/:projectId', dbPlans.getPlansByProjectId);


module.exports = router;