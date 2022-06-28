import Employees from '../models/Employees';
import firebaseApp from '../helper/firebase';

const register = async (req, res) => {
  try {
    const newFirebaseEmployee = await firebaseApp.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    await firebaseApp.auth().setCustomUserClaims(newFirebaseEmployee.uid, { role: 'EMPLOYEE' });

    const employeeCreated = new Employees({
      firebaseUid: newFirebaseEmployee.uid,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      assignedProjects: [],
      isActive: req.body.isActive,
    });
    await firebaseApp.auth().setCustomUserClaims(newFirebaseEmployee.uid, { role: 'EMPLOYEE' });
    const employeeSaved = await employeeCreated.save();
    return res.status(201).json({
      message: 'Employee successfully Registered',
      data: employeeSaved,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

export default register;
