const express = require('express');
const router = express.Router();
const dbAuth = require('../controllers/auth');


router.post('/register/sponsor', dbAuth.sponsorRegistration);
router.post('/register/project', dbAuth.projectRegistration);


module.exports = router;