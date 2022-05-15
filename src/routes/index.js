const express = require('express');

const router = express.Router();

const timeSheetRouter = require('./time-sheets');

router.use('/time-sheets', timeSheetRouter);

module.exports = router;
