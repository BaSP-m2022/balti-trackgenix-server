import express from 'express';
import {
  getTasks, findTask, addTask, editTask, deleteTask,
} from '../controllers/tasks';
import { validatePost, validatePut } from '../validations/tasks';

const taskRouter = express.Router();

taskRouter.get('/', getTasks)
  .get('/:id', findTask)
  .post('/', validatePost, addTask)
  .put('/:id', validatePut, editTask)
  .delete('/:id', deleteTask);

export default taskRouter;
