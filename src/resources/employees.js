const employees = require('../data/employees.json');

export const getEmployees = (req, res) => res.json(employees);

export const filterByDni = (req, res) => {
  const found = employees.find((employee) => employee.dni === parseInt(req.params.dni, 10));
  if (found) {
    res.status(200).json({
      success: true,
      data: found,
    });
  } else {
    res.status(400).json({
      success: false,
      msg: (`There are no employee by dni ${req.params.dni}`),
    });
  }
};
