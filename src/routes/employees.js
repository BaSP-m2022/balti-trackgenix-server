import express from 'express';
import { getEmployeesById, getAllEmployees } from '../controllers/employees';
// import employeesValidation from '../validations/employees';

const router = express.Router();

router
  .get('/', getAllEmployees)
  // .post('/')
  .get('/:id', getEmployeesById);

export default router;
