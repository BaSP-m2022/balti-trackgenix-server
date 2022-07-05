import express from 'express';
import {
  addTimeSheet,
  editTimeSheet,
  getAllTimeSheetsByEmployee,
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

router.post('/timesheet', validateTimeSheetCreation, addTimeSheet);
router.put('/timesheet/:id', validateTimeSheetUpdate, editTimeSheet);
router.get('timesheet/get-by-employee/:employee', getAllTimeSheetsByEmployee);
router.put('/:id', employeeValidation, updateEmployee);
router.get('/projects', getAllProjects);
router.get('/projects/:id', getProjectById);
router.put('projects/:id', updateProjectValidation, updateProjectById);
router.use('/tasks', tasksRouter);

export default router;
