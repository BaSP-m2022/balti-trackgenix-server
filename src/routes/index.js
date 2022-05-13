import express from 'express';
import adminRoutes from './admins';

const router = express.Router();

router
  .use('/admin', adminRoutes);

export default router;
