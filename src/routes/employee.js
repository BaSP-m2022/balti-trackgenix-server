import express from 'express';
import {
  addTimeSheet,
  editTimeSheet,
} from '../controllers/time-sheets';
import {
  getAllProjects,
  getProjectById,
  updateProjectById,
} from '../controllers/projects';
import tasksRouter from './tasks';
import { updateEmployee } from '../controllers/employees';
import { validateTimeSheetCreation, validateTimeSheetUpdate } from '../validations/time-sheets';
import employeeValidation from '../validations/employees';
import { updateProjectValidation } from '../validations/projects';

const router = express.Router();

router.post('/', validateTimeSheetCreation, addTimeSheet);
router.put('/:id', validateTimeSheetUpdate, editTimeSheet);
router.put('/:id', employeeValidation, updateEmployee);
router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.put('/:id', updateProjectValidation, updateProjectById);
router.use('/tasks', tasksRouter);

export default router;
