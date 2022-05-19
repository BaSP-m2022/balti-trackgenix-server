import express from 'express';
import {
  getEmployeesById, getAllEmployees, createEmployee, deleteEmployee, updateEmployee,
} from '../controllers/employees';

import employeeValidation from '../validations/employees';

const router = express.Router();

router.post('/', employeeValidation, createEmployee);
router.delete('/:id', deleteEmployee);
router.put('/:id', employeeValidation, updateEmployee);
router.get('/', getAllEmployees);
router.get('/:id', getEmployeesById);

export default router;
