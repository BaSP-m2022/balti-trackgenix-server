import express from 'express';
import timeSheetRouter from './time-sheets';
import adminRoutes from './admins';
import tasksRouter from './tasks';
import employeeRoutes from './employees';
import projectRoutes from './projects';
import superAdminRoutes from './super-admins';
import admin from './admin';
import employee from './employee';
import superAdmin from './super-admin';
import authRoutes from './auth';
import superAdminsMiddleware from '../middlewares/super-admins';
import adminsMiddleware from '../middlewares/admins';
import employeeMiddleware from '../middlewares/employees';

const router = express.Router();

router.use('/timesheets', timeSheetRouter);
router.use('/tasks', tasksRouter);
router.use('/employees', employeeRoutes);
router.use('/projects', projectRoutes);
router.use('/super-admin', superAdminRoutes);
router.use('/admins', adminRoutes);
router.use('/auth', authRoutes);
router.use('/superadmin', superAdminsMiddleware, superAdmin);
router.use('/admin', adminsMiddleware, admin);
router.use('/employee', employeeMiddleware, employee);

export default router;
