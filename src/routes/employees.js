import express from 'express';
import { createEmployee, deleteEmployee, updateEmployee } from '../controllers/employees';
import { validateCreation, validatUpdate } from '../validations/employees';

const router = express.Router();

router.post('/create', validateCreation, createEmployee);
router.delete('/delete', deleteEmployee);
router.put('/', validatUpdate, updateEmployee);

export default router;
