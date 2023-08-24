const express = require('express');
const router = express.Router();
const dbProjects = require('../controllers/projects');


router.get('/', dbProjects.getAllProjects);
router.get('/:projectId', dbProjects.getProjectById);
router.get('/sponsor/:sponsorId', dbProjects.getProjectsBysponsorId);
router.post('/', dbProjects.createProject);
router.put('/:id', dbProjects.updateProject);
router.delete('/:id', dbProjects.deleteProject);


module.exports = router;