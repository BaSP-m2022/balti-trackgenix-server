const fs = require('fs');
const express = require('express');
const employees = require('../data/employees.json');

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

export const createEmployee = (req, res) => {
  const newEmployee = {
    dni: req.body.dni,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
  };

  if (!newEmployee.first_name
    || !newEmployee.last_name
    || !newEmployee.dni
    || !newEmployee.email
    || !newEmployee.password) {
    return res.status(400).json({
      msg: 'Please include a name, last name, dni, email and password',
    });
  }
  employees.push(newEmployee);
  fs.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
    if (err) {
      res.send(err);
    }
  });
  return res.json(employees);
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
            res.send(err);
          }
        });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the dni of ${req.query.dni}` });
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
    res.send('Employee DNI not found');
  } else {
    fs.writeFile('src/data/employees.json', JSON.stringify(found), (err) => {
      if (err) {
        res.status(400).json({
          success: false,
          msg: ('Employee not found.'),
        });
      }
    });
    res.status(200).json({
      success: true,
      msg: (`Employee dni: ${employeeDni} deleted.`),
    });
  }
};
