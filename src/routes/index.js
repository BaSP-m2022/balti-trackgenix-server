import express from 'express';
import superAdminRoutes from './super-admins';
import admin from './admin';
import employee from './employee';
import superAdmin from './super-admin';
import authRoutes from './auth';
import superAdminsMiddleware from '../middlewares/super-admins';
import adminsMiddleware from '../middlewares/admins';
import employeeMiddleware from '../middlewares/employees';

const router = express.Router();

router.use('/super-admins', superAdminRoutes);
router.use('/auth', authRoutes);
router.use('/super-admin', superAdminsMiddleware, superAdmin);
router.use('/admin', adminsMiddleware, admin);
router.use('/employee', employeeMiddleware, employee);

export default router;
