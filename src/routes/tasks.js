import express from 'express';
import {
  getTasks, findTask, addTask, editTask, deleteTask,
} from '../controllers/tasks';
import { validatePost, validatePut } from '../validations/tasks';
// adminds controllers
const router = express.Router();

router.get('/', getTasks);
router.get('/:id', findTask);
router.post('/', validatePost, addTask);
router.put('/:id', validatePut, editTask);
router.delete('/:id', deleteTask);

export default router;
