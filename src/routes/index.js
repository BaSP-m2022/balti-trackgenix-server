import express from 'express';
import adminRoutes from './admin';
import employeeRoutes from './employee';
import superAdminRoutes from './super-admin';
import authRoutes from './auth';
import superAdminsMiddleware from '../middlewares/super-admins';
import adminsMiddleware from '../middlewares/admins';
import employeeMiddleware from '../middlewares/employees';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/super-admin', superAdminsMiddleware, superAdminRoutes);
router.use('/admin', adminsMiddleware, adminRoutes);
router.use('/employee', employeeMiddleware, employeeRoutes);

export default router;
