import express from 'express';
import {
  getEmployeesById,
  getAllEmployees,
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from '../controllers/employees';
import {
  updateValidation,
  createValidation,
} from '../validations/employees';

const router = express.Router();

router.post('/', createValidation, createEmployee);
router.delete('/:id', deleteEmployee);
router.put('/:id', updateValidation, updateEmployee);
router.get('/', getAllEmployees);
router.get('/:id', getEmployeesById);

export default router;
