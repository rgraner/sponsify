const express = require('express');
const router = express.Router();
const dbPlans = require('../controllers/plans');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/', dbPlans.getAllPlans);
router.get('/project/:projectId', dbPlans.getPlansByProjectId);
router.get('/sponsor/:sponsorId', dbPlans.getPlansBySponsorId);
router.get('/sponsor/user/:userId', authMiddleware, dbPlans.getPlansBySponsorUserId);
router.post('/', dbPlans.createPlan);
router.put('/:planId', dbPlans.updatePlan);
router.put('/:planId/archive', dbPlans.archivePlan);
// router.delete('/:planId', dbPlans.deletePlan);
router.delete('/plan_benefit/:benefitId', dbPlans.deletePlanBenefitById);


module.exports = router;