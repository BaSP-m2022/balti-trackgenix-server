import express from 'express';
import {
  getAllProjects,
  deleteById,
  createProject,
  getProjectById,
  updateProjectById,
  getProjectsByStatus,
} from '../controllers/projects';
import {
  createProjectValidation,
  updateProjectValidation,
} from '../validations/projects';

const router = express.Router();

router.get('/', getAllProjects);
router.post('/', createProjectValidation, createProject);
router.delete('/:id', deleteById);
router
  .get('/:id', getProjectById)
  .put('/:id', updateProjectValidation, updateProjectById)
  .get('/get-by-status/:status', getProjectsByStatus);

export default router;
