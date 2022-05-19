import express from 'express';
import {
  deleteTimeSheets,
  getTimeSheet,
  addTimeSheet,
  editTimeSheet,
  getAllTimeSheetsByEmployee,
  getAllTimeSheets,
} from '../controllers/time-sheets';

import { validateTimeSheetCreation, validateTimeSheetUpdate } from '../validations/time-sheets';

const router = express.Router();

router.get('/', getAllTimeSheets);
router.get('/:id', getTimeSheet);
router.get('/get-by-employee/:employee', getAllTimeSheetsByEmployee);
router.delete('/:id', deleteTimeSheets);
router.post('/', validateTimeSheetCreation, addTimeSheet);
router.put('/:id', validateTimeSheetUpdate, editTimeSheet);

export default router;
