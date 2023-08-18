const express = require('express');
const router = express.Router();
const dbProjects = require('../controllers/projects');


router.get('/', dbProjects.getAllProjects);
router.post('/', dbProjects.createProject);
router.put('/:id', dbProjects.updateProject);
router.delete('/:id', dbProjects.deleteProject);

module.exports = router;