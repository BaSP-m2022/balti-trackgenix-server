import express from 'express';
import { createEmployee, getAuthEmployee } from '../controllers/employees';
import { createValidation } from '../validations/employees';
import adminMiddleware from '../middlewares/admins';
import employeeMiddleware from '../middlewares/employees';
import adminController from '../controllers/admins';

const router = express.Router();

router.post('/register', createValidation, createEmployee)
  .get('/getEmployee', employeeMiddleware, getAuthEmployee)
  .get('/getAdmin', adminMiddleware, adminController.getAuthAdmin);

export default router;
