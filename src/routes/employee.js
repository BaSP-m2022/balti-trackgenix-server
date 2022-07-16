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
import { updateEmployee, getEmployeesById } from '../controllers/employees';
import {
  validateTimeSheetCreation,
  validateTimeSheetUpdate,
} from '../validations/time-sheets';
import { updateValidation } from '../validations/employees';
import { updateProjectValidation } from '../validations/projects';

const router = express.Router();

router
  .post('/timesheet', validateTimeSheetCreation, addTimeSheet)
  .put('/timesheet/:id', validateTimeSheetUpdate, editTimeSheet)
  .get('timesheet/get-by-employee/:employee', getAllTimeSheetsByEmployee)
  .get('/:id', getEmployeesById)
  .put('/:id', updateValidation, updateEmployee)
  .get('/projects', getAllProjects)
  .get('/projects/:id', getProjectById)
  .put('/projects/:id', updateProjectValidation, updateProjectById)
  .use('/tasks', tasksRouter);

export default router;
