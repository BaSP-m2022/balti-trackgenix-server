import express from 'express';
import timeSheetRouter from './time-sheets';

const router = express.Router();

router.use('/timesheets', timeSheetRouter);

export default router;
