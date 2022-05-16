import express from 'express';
import { getEmployeesById, getAllEmployees } from '../controllers/employees';

const router = express.Router();

router
  .get('/', getAllEmployees)
  .get('/:id', getEmployeesById);

export default router;
