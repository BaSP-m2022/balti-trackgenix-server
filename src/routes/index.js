const express = require('express');

const router = express.Router();

const tasksRouter = require('./tasks');

router.use('/tasks', tasksRouter);

exports = router;
