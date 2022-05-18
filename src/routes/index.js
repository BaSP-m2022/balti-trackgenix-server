import express from 'express';
import timeSheetRouter from './time-sheets';

const router = express.Router();

router.use('/time-sheets', timeSheetRouter);

export default router;
