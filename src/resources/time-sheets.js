const fs = require('fs');

const timeSheets = require('../data/time-sheets.json');

export const addTimeSheet = (req, res) => {
  const newTimeSheet = req.body;
  timeSheets.push(newTimeSheet);
  fs.writeFile(
    'src/data/time-sheets.json',
    JSON.stringify(timeSheets),
    (err) => {
      if (err) {
        res.json({
          success: false,
          msg: err,
        });
      } else {
        res.json({
          success: true,
          msg: 'Time Sheet Created',
          data: newTimeSheet,
        });
      }
    },
  );
};

export const editTimeSheet = (req, res) => {
  const tsIdx = timeSheets.findIndex((usrTs) => usrTs.timeSheetId === parseInt(req.params.id, 10));
  const updTs = req.body;

  if (tsIdx !== -1) {
    timeSheets[tsIdx].employeeId = (
      updTs.employeeId ? updTs.employeeId : timeSheets[tsIdx].employeeId);
    timeSheets[tsIdx].assignedProject = (
      updTs.assignedProject ? updTs.assignedProject : timeSheets[tsIdx.assignedProject]);
    timeSheets[tsIdx].role = updTs.role ? updTs.role : timeSheets[tsIdx].role;
    timeSheets[tsIdx].date = updTs.date ? updTs.date : timeSheets[tsIdx].date;
    timeSheets[tsIdx].rate = updTs.rate ? updTs.rate : timeSheets[tsIdx].rate;
    timeSheets[tsIdx].workedHours = (
      updTs.workedHours ? updTs.workedHours : timeSheets[tsIdx].workedHours);
    timeSheets[tsIdx].description = (
      updTs.description ? updTs.description : timeSheets[tsIdx].description);
    timeSheets[tsIdx].taskId = (
      updTs.taskId ? updTs.taskId : timeSheets[tsIdx].taskId);

    fs.writeFile(
      'src/data/time-sheets.json',
      JSON.stringify(timeSheets),
      (err) => {
        if (err) {
          res.json({
            success: false,
            msg: err,
          });
        } else {
          res.json({
            success: true,
            msg: 'Time Sheet Edited',
            data: timeSheets[tsIdx],
          });
        }
      },
    );
  } else {
    res.status(400).json({ success: false, msg: 'TimeSheet not found' });
  }
};

export const getAllTimeSheetsByEmployee = (req, res) => {
  const filterByEmployee = timeSheets.filter((ts) => ts.employeeId === parseInt(req.params.id, 10));

  if (filterByEmployee.length > 0) {
    res.json({
      success: true,
      msg: 'These are the time sheets found',
      data: filterByEmployee,
    });
  } else {
    res.status(400).json({
      success: false,
      msg: 'Time sheets not found for this ID',
    });
  }
};
