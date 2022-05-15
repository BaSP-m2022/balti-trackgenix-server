// eslint-disable-next-line import/no-import-module-exports
import {
  deleteTimeSheets,
  getTimeSheets,
  addTimeSheet,
  editTimeSheet,
  getAllTimeSheetsByEmployee,
  getAllTimeSheets,
} from '../controllers/time-sheets';

const express = require('express');

const router = express.Router();

router.get('/', getAllTimeSheets);
router.get('/:id', getTimeSheets);
router.get('/get-all-time-sheets-by-employee/:id', getAllTimeSheetsByEmployee);
router.delete('/', deleteTimeSheets);
router.post('/add', addTimeSheet);
router.put('/edit/:id', editTimeSheet);

module.exports = router;
