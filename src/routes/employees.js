import express from 'express';
import { createEmployee, deleteEmployee, updateEmployee } from '../controllers/employees';
import employeeValidation from '../validations/employees';

const router = express.Router();

router.post('/', employeeValidation, createEmployee);
router.delete('/:id', deleteEmployee);
router.put('/:id', employeeValidation, updateEmployee);

export default router;
