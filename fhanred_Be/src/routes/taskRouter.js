const Router = require("express");
const taskController = require("../controllers/dashboardControllers/");


const router = Router();
 
// Rutas para operaciones relacionadas con las tareas
router.get('/', taskController.getAllTasks);
router.post('/',taskController.createTask);
router.post('/asignar',taskController.assignTask);
router.get('/listarTareas/:n_documento',taskController.getTasksForUser)
router.get('/listarTareas', taskController.getAllAssignments)
router.delete('/eliminar/:id', taskController.deletedAssignment);

module.exports = router;
