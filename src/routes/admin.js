import express from 'express';
import projectRoutes from './projects';
import employeeRoutes from './employees';
import timeSheetRouter from './time-sheets';

const router = express.Router();

router.use('/projects', projectRoutes);
router.use('/employees', employeeRoutes);
router.use('/timesheets', timeSheetRouter);
export default router;
