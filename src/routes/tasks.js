import {
  getTasks, findTaskById, findTask, addTask, deleteTask, editTask,
} from '../controllers/tasks';

const express = require('express');

const router = express.Router();

router.post('/', addTask);
router.put('/', editTask);
router.delete('/', deleteTask);
router.get('/', getTasks);
router.get('/get-by-id', findTaskById);
router.get('/filter', findTask);

exports = router;
