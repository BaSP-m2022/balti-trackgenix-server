const Employee = require('../models/Employees');
const Firebase = require('../helper/firebase');

const register = async (req, res) => {
  try {
    const newFirebaseEmployee = await Firebase.auth().createEmployee({
      email: req.body.email,
      password: req.body.password,
    });

    const employeeCreated = new Employee({
      email: req.body.email,
      firebaseUid: newFirebaseEmployee.uid,
    });
    const employeeSaved = await employeeCreated.save();
    return res.status(201).json({
      message: 'Employee created',
      data: employeeSaved,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.toString(),
    });
  }
};

module.export = { register };
