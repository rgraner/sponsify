const express = require('express');
const router = express.Router();
const dbSponsors = require('../controllers/sponsors');


router.get('/', dbSponsors.getAllSponsors);
router.post('/', dbSponsors.createSponsor);
router.put('/:id', dbSponsors.updateSponsor);
router.delete('/:id', dbSponsors.deleteSponsor);

module.exports = router;