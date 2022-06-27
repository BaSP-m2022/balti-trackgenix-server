import Employees from '../models/Employees';
import firebaseApp from '../helper/firebase';

const register = async (req, res) => {
  try {
    const newFirebaseEmployee = await firebaseApp.auth().createEmployee({
      email: req.body.email,
      password: req.body.password,
    }).setCustomUserClaims(firebaseApp.uid, { role: 'EMPLOYEE' });

    const employeeCreated = new Employees({
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

export default register;
