import express from 'express';
import * as taskController from '../controllers/taskController.mjs';
import auth from '../controllers/auth.mjs';

const taskRouter = express.Router();

// Define routes
taskRouter.get('/tasks',auth,taskController.getTasks);
taskRouter.post('/task/add',auth,taskController.addTask);
taskRouter.put('/task/update/status/:status',auth,taskController.updateTask);
taskRouter.put('/task/update/body/:taskId',auth,taskController.updateTaskBody);
taskRouter.delete('/task/:id',auth,taskController.deleteTask);

// Export taskRouter as the default export
export default taskRouter;

