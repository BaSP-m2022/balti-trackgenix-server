import Admin from '../models/Admins';

const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await Admin.find({});
    if (allAdmins) {
      return res.status(200).json({
        msg: 'This is the complete list of admins',
        data: allAdmins,
        error: false,
      });
    } return res.status(404).json({
      msg: 'No list of admins found',
      data: undefined,
      error: true,
    });
  } catch (err) {
    return res.status(400).json({
      msg: 'An error ocurred',
      data: undefined,
      error: true,
    });
  }
};

const addAdmin = async (req, res) => {
  try {
    const newAdmin = new Admin({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      isActive: req.body.isActive,
    });
    const adminSaved = await newAdmin.save();
    if (adminSaved) {
      return res.status(201).json({
        msg: 'Admin created successfully',
        data: adminSaved,
        error: false,
      });
    } return res.status(400).json({
      msg: 'Admin creation failed. Please review and correct the data',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'There was an error',
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
        msg: `Admin ${req.params.id} successfully updated`,
        data: result,
        error: false,
      });
    } return res.status(404).json({
      msg: `No admin with the id of ${req.params.id}`,
      data: undefined,
      error: true,
    });
  } catch (err) {
    return res.status(400).json({
      msg: 'There was an error',
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
        msg: `Admin ${req.params.id} found`,
        data: result,
        error: false,
      });
    } return res.status(404).json({
      msg: `No admin with the id of ${req.params.id}`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'There was an error',
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
        msg: `Admin ${req.params.id} deleted successfully`,
        data: result,
        error: false,
      });
    } return res.status(404).json({
      msg: `Admin ${req.params.id} not found`,
      data: undefined,
      error: true,
    });
  } catch (err) {
    return res.status(400).json({
      msg: 'There was an error',
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
