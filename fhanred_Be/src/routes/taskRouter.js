const Router = require("express");
const taskController = require("../controllers/dashboardControllers/");


const router = Router();
 
// Rutas para operaciones relacionadas con las tareas
router.get('/', taskController.getAllTasks);
router.post('/',taskController.createTask);
router.post('/asignar',taskController.assignTask);
router.get('/listarTareas',taskController.getTasksForUser)

module.exports = router;
