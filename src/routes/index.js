import express from 'express';
import tasksRouter from './tasks';
import superAdminRoutes from './super-admins';

const router = express.Router();

router.use('/tasks', tasksRouter);

router.use('/super-admin', superAdminRoutes);

export default router;
