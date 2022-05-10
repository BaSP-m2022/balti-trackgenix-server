const fs = require('fs');
const timeSheets = require('../data/time-sheets.json');

export const getTimeSheets = (req, res) => {
  const found = timeSheets.find((tSheet) => tSheet.timeSheetId === parseInt(req.params.id, 10));

  if (found) {
    res.status(200).json({
      success: true,
      data: timeSheets,
    });
  } else {
    res.status(400).json({
      success: false,
      msg: ('Time Sheet ID not found'),
    });
  }
};

export const deleteTimeSheets = (req, res) => {
  const found = timeSheets.filter((tSheet) => tSheet.timeSheetId !== parseInt(req.query.id, 10));

  if (found) {
    fs.writeFile('src/data/time-sheets.json', JSON.stringify(found), (err) => {
      if (err) {
        res.status(400).json({
          success: false,
          msg: ('Time Sheet not found'),
        });
      }
    });
    res.status(200).json({
      success: true,
      data: timeSheets,
    });
  }
};
