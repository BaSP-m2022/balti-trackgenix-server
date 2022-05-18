import express from 'express';
import {
  getAllProjects,
  deleteById,
  createProject,
} from '../controllers/projects';
import projectValidations from '../validations/projects';

const router = express.Router();

router.get('/', getAllProjects);
router.post('/', projectValidations.createProjectValidation, createProject);
router.delete('/:id', deleteById);

export default router;
