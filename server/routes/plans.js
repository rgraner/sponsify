const express = require('express');
const router = express.Router();
const dbPlans = require('../controllers/plans');


router.get('/project/:projectId', dbPlans.getPlansByProjectId);
router.post('/', dbPlans.createPlan);
router.put('/:planId', dbPlans.updatePlan);
router.delete('/:planId', dbPlans.deletePlan);
router.delete('/plan_benefit/:benefitId', dbPlans.deletePlanBenefitById);


module.exports = router;