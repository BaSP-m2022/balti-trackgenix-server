// eslint-disable-next-line import/no-import-module-exports
import {
  deleteTimeSheets,
  getTimeSheet,
  addTimeSheet,
  editTimeSheet,
  getAllTimeSheetsByEmployee,
  getAllTimeSheets,
} from '../controllers/time-sheets';

const express = require('express');

const router = express.Router();

router.get('/', getAllTimeSheets);
router.get('/:id', getTimeSheet);
router.get('/get-all-time-sheets-by-employee/:employee', getAllTimeSheetsByEmployee);
router.delete('/:id', deleteTimeSheets);
router.post('/add', addTimeSheet);
router.put('/edit/:id', editTimeSheet);

module.exports = router;
