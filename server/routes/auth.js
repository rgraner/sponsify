const express = require('express');
const router = express.Router();
const dbAuth = require('../controllers/auth');
const authMiddleware = require('../middlewares/authMiddleware');


// router.post('/register/sponsor', dbAuth.sponsorRegistration);
// router.post('/register/project', dbAuth.projectRegistration);
router.post('/login', dbAuth.login);
router.get('/logout', dbAuth.logout);
router.get('/check', authMiddleware, dbAuth.check);


module.exports = router;