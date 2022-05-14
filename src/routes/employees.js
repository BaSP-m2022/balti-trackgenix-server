import express from 'express';
import { createEmployee, deleteEmployee } from '../controllers/employees';
import { validateCreation } from '../validations/employees';

const router = express.Router();

router.post('/create', validateCreation, createEmployee);
router.delete('/delete', deleteEmployee);

export default router;
