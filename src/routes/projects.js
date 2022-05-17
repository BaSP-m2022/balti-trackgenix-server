import express from 'express';
import {
  getProjectById, updateProjectById, getProjectsByStatus,
} from '../controllers/projects';
import updateProjectValidation from '../validations/projects';

const router = express.Router();

router
  .get('/:id', getProjectById)
  .put('/:id', updateProjectValidation, updateProjectById)
  .get('/get-by-status/:status', getProjectsByStatus);

export default router;
