import Employee from '../models/Employees';

export const getAllEmployees = async (req, res) => {
  try {
    const allEmployees = await Employee.find({});
    return res.status(200).json({
      message: 'All Employees collected',
      data: allEmployees,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};

export const getEmployeesById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    return res.status(200).json({
      message: 'Employee with the ID required collected',
      data: employee,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};
