import express from 'express';
import timeSheetRouter from './time-sheets';
import adminRoutes from './admins';
import tasksRouter from './tasks';
import employeeRoutes from './employees';
import projectRoutes from './projects';
import superAdminRoutes from './super-admins';

const router = express.Router();

router.use('/timesheets', timeSheetRouter);
router.use('/tasks', tasksRouter);
router.use('/employees', employeeRoutes);
router.use('/projects', projectRoutes);
router.use('/super-admin', superAdminRoutes);
router.use('/admins', adminRoutes);
router.use('/projects', projectRoutes);

export default router;
