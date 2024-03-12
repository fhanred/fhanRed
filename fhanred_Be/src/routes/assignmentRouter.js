const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/dashboardControllers/');



// Rutas para operaciones relacionadas con la asignación de tareas
router.post('/assignments', assignmentController.assignTaskToUser);
router.get('/assignments/:userId', assignmentController.getAssignedTasksForUser);
// Otras rutas para operaciones con la asignación de tareas

module.exports = router;