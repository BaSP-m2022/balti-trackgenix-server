import express from 'express';
import superAdminRoutes from './super-admins';

const router = express.Router();

router.use('/super-admin', superAdminRoutes);

export default router;
