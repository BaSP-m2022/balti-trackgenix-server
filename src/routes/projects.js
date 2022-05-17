import express from 'express';
import {
  getAllProjects, getProjectById, updateProjectById, getProjectsByStatus, createNewProject,
} from '../controllers/projects';

const router = express.Router();

router.get('/', getAllProjects)
  .get('/:id', getProjectById)
  .put('/:id', updateProjectById)
  .get('/get-by-status/:status', getProjectsByStatus)
  .post('/', createNewProject);

export default router;
