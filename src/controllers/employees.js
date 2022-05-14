const fs = require('fs');
const employees = require('../data/employees.json');
const Employee = require('../models/Employees');

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
    const employee = new Employee(newEmployee);
    await employee.save();
    return res.status(201).json({
      message: 'New Employee created',
      data: newEmployee,
      error: false,
    });
  } catch (error) {
    return res.json({ msg: error });
  }
};

export const updateEmployee = (req, res) => {
  const employeeFound = employees.some((employee) => employee.dni === parseInt(req.query.dni, 10));
  const updEmployee = req.body;
  if (employeeFound) {
    employees.forEach((employee, index) => {
      if (employee.dni === parseInt(req.query.dni, 10)) {
        employees[index].first_name = updEmployee.first_name;
        employees[index].last_name = updEmployee.last_name;
        employees[index].email = updEmployee.email;
        employees[index].password = updEmployee.password;
        fs.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
          if (err) {
            res.status(400).json({
              success: false,
              msg: (err),
            });
          }
        });
      }
    });
  } else {
    res.status(400).json({
      success: false,
      msg: `No member with the dni of ${req.query.dni}`,
    });
  }
  res.status(200).json({
    success: true,
    msg: (`Employee dni ${updEmployee.dni} edited`),
    data: updEmployee,
  });
};

export const deleteEmployee = (req, res) => {
  const employeeDni = parseInt(req.query.dni, 10);
  const found = employees.filter((employee) => employee.dni !== employeeDni);
  if (employees.length === found.length) {
    res.status(400).json({
      success: false,
      msg: 'Employee DNI not found',
    });
  } else {
    fs.writeFile('src/data/employees.json', JSON.stringify(found), (err) => {
      if (err) {
        res.status(400).json({
          success: false,
          msg: (err),
        });
      }
    });
    res.status(200).json({
      success: true,
      msg: (`Employee dni: ${employeeDni} deleted.`),
    });
  }
};

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
