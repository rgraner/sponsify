const express = require('express');
const router = express.Router();
const getPlansByProjectId = require('../controllers/plans');


router.get('/project/:projectId', getPlansByProjectId);


module.exports = router;