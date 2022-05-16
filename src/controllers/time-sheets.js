import TimeSheetModel from '../models/Time-sheets';

export const getAllTimeSheets = async (req, res) => {
  try {
    const allTimeSheets = await TimeSheetModel.find({});
    return res.status(200).json({
      success: true,
      data: allTimeSheets,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};

export const getTimeSheet = async (req, res) => {
  try {
    if (req.params.id) {
      const timeSheet = await TimeSheetModel.filter(req.params.id);
      return res.status(200).json({
        success: true,
        data: timeSheet,
      });
    }
    return res.status(400).json({
      success: false,
      msg: 'Missing id parameter',
    });
  } catch (error) {
    return res.json({
      success: false,
      msg: error,
    });
  }
};

export const deleteTimeSheets = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        msg: 'Missing id parameter',
      });
    }
    const result = await TimeSheetModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        success: false,
        msg: 'The timesheet has not been found',
      });
    }
    return res.status(200).json({
      success: true,
      msg: 'Timesheet successfully deleted',
    });
  } catch (error) {
    return res.json({
      success: false,
      msg: error,
    });
  }
};

export const addTimeSheet = async (req, res) => {
  const newTimeSheet = new TimeSheetModel({
    employee: req.body.employee,
    project: req.body.project,
    role: req.body.role,
    rate: req.body.rate,
    workedHours: req.body.workedHours,
    description: req.body.description,
    task: req.body.task,
  });
  try {
    const savedTimeSheet = await newTimeSheet.save();
    return res.status(201).json({
      success: true,
      data: savedTimeSheet,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      msg: err,
    });
  }
};

export const editTimeSheet = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        success: false,
        msg: 'Missing id parameter',
      });
    }
    const result = await TimeSheetModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        success: false,
        msg: 'The timesheet has not been found',
      });
    }
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.json({
      success: false,
      msg: 'There was an error',
    });
  }
};

export const getAllTimeSheetsByEmployee = async (req, res) => {
  try {
    if (req.params.employee) {
      const filterByEmployee = await TimeSheetModel.find({ employee: req.params.employee });
      return res.status(200).json({
        success: true,
        data: filterByEmployee,
      });
    }
    return res.status(400).json({
      success: false,
      msg: 'Missing id parameter',
    });
  } catch (error) {
    return res.json({
      success: false,
      msg: error,
    });
  }
};
