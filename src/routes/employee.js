import express from 'express';
import {
  addTimeSheet,
  editTimeSheet,
  getAllTimeSheetsByEmployee,
  getTimeSheet,
} from '../controllers/time-sheets';
import {
  getAllProjects,
  getProjectById,
  updateProjectById,
} from '../controllers/projects';
import taskRouter from './tasks';
import { updateEmployee, getEmployeesById, getAllEmployees } from '../controllers/employees';
import {
  validateTimeSheetCreation,
  validateTimeSheetUpdate,
} from '../validations/time-sheets';
import { updateValidation } from '../validations/employees';
import { updateProjectValidation } from '../validations/projects';

const router = express.Router();

router
  .use('/tasks', taskRouter)
  .post('/timesheet', validateTimeSheetCreation, addTimeSheet)
  .put('/timesheet/:id', validateTimeSheetUpdate, editTimeSheet)
  .get('/timesheet/:id', getTimeSheet)
  .get('/timesheet/get-by-employee/:employee', getAllTimeSheetsByEmployee)
  .get('/employees', getAllEmployees)
  .get('/:id', getEmployeesById)
  .put('/:id', updateValidation, updateEmployee)
  .get('/projects', getAllProjects)
  .get('/projects/:id', getProjectById)
  .put('/projects/:id', updateProjectValidation, updateProjectById);

export default router;
