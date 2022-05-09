const express = require('express');
const employees = require('../data/employees.json');
// const uuid = require('uuid');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// eslint-disable-next-line import/prefer-default-export
export const createEmployee = (req, res) => {
  const newEmployee = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    dni: req.body.dni,
    email: req.body.email,
    password: req.body.password,
  };

  // eslint-disable-next-line max-len
  if (!newEmployee.first_name
    || !newEmployee.last_name
    || !newEmployee.dni
    || !newEmployee.email
    || !newEmployee.password) {
    return res.status(400).json({
      msg: 'Please include a name, last name, dni, email and password',
    });
  }
  // res.status(200).json({ msg: 'Employee created' });
  employees.push(newEmployee);
  res.json(employees);
};
