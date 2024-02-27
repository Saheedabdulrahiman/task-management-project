const express = require('express');
const router = express.Router();
const projectController = require('../controller/projectController');

router.post('/add-project', projectController.addProject);
router.delete('/delete-project/:id',projectController.deleteProject)
router.get('/list-projects',projectController.listAllProject)
router.get('/list-projects/:id',projectController.getProjectById)
router.patch('/update-project/:id',projectController.updateProject)

module.exports = router;
