import express from 'express';
import employeeRoutes from './employees';
import projectRoutes from './projects';
import superAdminRoutes from './super-admins';

const router = express.Router();

router.use('/employees', employeeRoutes);
router.use('/projects', projectRoutes);
router.use('/super-admin', superAdminRoutes);

export default router;
