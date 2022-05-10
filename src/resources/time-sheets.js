const fs = require('fs');
const timeSheets = require('../data/time-sheets.json');

// Gets Single Time Sheet by Time Sheet ID
export const getTs = (req, res) => {
  const found = timeSheets.find((tSheet) => tSheet.timeSheetId === parseInt(req.params.id, 10));

  if (found) {
    res.status(200).json(timeSheets);
  } else {
    res.status(400).json({ msg: `No Time Sheet with the ID of ${req.params.id}` });
  }
};

// Delete Time Sheet
export const deleteTs = (req, res) => {
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
      msg: (`Time Sheet id: ${req.query.id} deleted.`),
    });
  }
};
