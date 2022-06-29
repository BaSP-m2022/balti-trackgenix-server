import Admin from '../models/Admins';
import Firebase from '../helper/firebase';

const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await Admin.find({});
    if (allAdmins) {
      return res.status(200).json({
        message: 'This is the complete list of admins',
        data: allAdmins,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'No list of admins found',
      data: undefined,
      error: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'An error ocurred',
      data: undefined,
      error: true,
    });
  }
};

const addAdmin = async (req, res) => {
  let firebaseUid;
  try {
    const newFirebaseUser = await Firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    await Firebase.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'ADMIN' });
    const newAdmin = new Admin({
      firebaseUid: newFirebaseUser.uid,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      isActive: req.body.isActive,
    });
    const adminSaved = await newAdmin.save();
    if (adminSaved) {
      return res.status(201).json({
        message: 'Admin created successfully',
        data: adminSaved,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'Admin creation failed. Please review and correct the data',
      data: undefined,
      error: true,
    });
  } catch (error) {
    if (firebaseUid) {
      await Firebase.default.auth().deleteUser(firebaseUid);
    }
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const result = await Admin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (result) {
      return res.status(200).json({
        message: `Admin ${req.params.id} successfully updated`,
        data: result,
        error: false,
      });
    }
    return res.status(404).json({
      message: `No admin with the id of ${req.params.id}`,
      data: undefined,
      error: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};

const findAdminById = async (req, res) => {
  try {
    const result = await Admin.findById(req.params.id);
    if (result) {
      return res.status(200).json({
        message: `Admin ${req.params.id} found`,
        data: result,
        error: false,
      });
    }
    return res.status(404).json({
      message: `No admin with the id of ${req.params.id}`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};

const delAdmin = async (req, res) => {
  try {
    const result = await Admin.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).json({
        message: `Admin ${req.params.id} deleted successfully`,
        data: result,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Admin ${req.params.id} not found`,
      data: undefined,
      error: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllAdmins,
  delAdmin,
  addAdmin,
  findAdminById,
  updateAdmin,
};
