const express = require('express');
const router = express.Router();
const dbSponsors = require('../controllers/sponsors');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/', dbSponsors.getAllSponsors);
router.get('/:sponsorId', dbSponsors.getSponsorById);
router.get('/user/:userId', authMiddleware, dbSponsors.getSponsorByUserId);
router.get('/project/:projectId', dbSponsors.getSponsorsByProjectId);
router.post('/', dbSponsors.createSponsor);
router.put('/:id', dbSponsors.updateSponsor);
router.delete('/:id', dbSponsors.deleteSponsor);


module.exports = router;