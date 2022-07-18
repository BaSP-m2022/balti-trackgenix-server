import express from 'express';
import { createEmployee } from '../controllers/employees';
import { createValidation } from '../validations/employees';

const router = express.Router();

router.post('/register', createValidation, createEmployee);

export default router;
