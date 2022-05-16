import express from 'express';
import {
  allProjects, filterById, createProject, putById, deleteById, putEmployee, getByStatus,
} from '../controllers/projects';

const router = express.Router();

router.get('/', allProjects)
  .get('/:id', filterById)
  .post('/', createProject)
  .put('/:id', putById)
  .delete('/:id', deleteById)
  .put('/put-employee/:id', putEmployee)
  .get('/get-by-status/:status', getByStatus);

export default router;
