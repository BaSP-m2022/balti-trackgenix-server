import express from 'express';
import projectRoutes from './projects';
import superAdminRoutes from './super-admins';

const router = express.Router();

router.use('/projects', projectRoutes);
router.use('/super-admin', superAdminRoutes);

export default router;
