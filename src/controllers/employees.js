import Employees from '../models/Employees';

export const createEmployee = async (req, res) => {
  const newEmployee = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    assignedProjects: req.body.assignedProjects,
    isActive: req.body.isActive,
  };

  try {
    const employee = new Employees(newEmployee);
    await employee.save();
    return res.status(201).json({
      message: 'New Employee created',
      data: newEmployee,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Missing data. Check the fields',
      data: {} || [] || undefined,
      error: true,
    });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(400).json({
        message: 'Missing Id',
        data: {} || [] || undefined,
        error: true,
      });
    }
    const result = await Employees.findByIdAndDelete(req.query.id);
    if (!result) {
      return res.status(404).json({
        message: 'Employee not found',
        data: {} || [] || undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Employee deleted',
      data: `Employee id: ${req.query.id} deleted.`,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Bad request',
      data: {} || [] || undefined,
      error: true,
    });
  }
};

export const updateEmployee = async (req, res) => {
  const updatedEmployee = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    assignedProjects: req.body.assignedProjects,
    isActive: req.body.isActive,
  };

  try {
    if (!req.query.id) {
      return res.status(400).json({
        message: 'Missing Id',
        data: {} || [] || undefined,
        error: true,
      });
    }
    const result = await Employees.findByIdAndUpdate(req.query.id, (updatedEmployee));
    if (!result) {
      return res.status(404).json({
        message: 'Employee not found',
        data: {} || [] || undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Employee updated',
      data: `Employee id: ${req.query.id} updated.`,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Bad request',
      data: {} || [] || undefined,
      error: true,
    });
  }
};
