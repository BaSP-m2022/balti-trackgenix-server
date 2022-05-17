import express from 'express';
import {
  allProjects,
  deleteById,
  filterById,
  createProject,
} from '../controllers/projects';
import projectsValidations from '../validations/projects';

const router = express.Router;

router.get('/', allProjects);
router.get('/:id', filterById);
router.post('/', projectsValidations.createProject, createProject);
router.delete(':id', deleteById);

export default router;
