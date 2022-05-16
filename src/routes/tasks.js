import express from 'express';
import { addTask, getTasks, findTask } from '../controllers/tasks';
// adminds controllers
const router = express.Router();

router.get('/', getTasks);
router.get('/:id', findTask);
router.post('/', addTask);
// router.put('/', editTask);
// router.delete('/', deleteTask);
// router.get('/get-by-id', findTaskById);

export default router;
