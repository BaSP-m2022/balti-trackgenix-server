import express from 'express';
import { createEmployee } from '../controllers/employees';
import employeeValidation from '../validations/employees';

const router = express.Router();

router.post('/register', employeeValidation, createEmployee);

export default router;
