import Admin from '../models/Admins';

export const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await Admin.find({});
    return res.status(200).json(allAdmins);
  } catch (err) {
    return res.status(500).json({
      msg: 'An error ocurred',
      success: false,
    });
  }
};

export const addAdmin = async (req, res) => {
  try {
    const newAdmin = new Admin({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      isActive: req.body.isActive,
    });
    const adminSaved = await newAdmin.save();
    return res.status(201).json({
      msg: 'Admin created successfully',
      data: adminSaved,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      msg: error,
      success: false,
    });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        msg: 'No id input',
        success: false,
      });
    }
    const result = await Admin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        msg: 'The Super Admin has not been found',
        success: false,
      });
    }
    return res.status(200).json({
      data: result,
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      msg: 'An error ocurred while finding Admin',
      success: false,
    });
  }
};

export const findAdminById = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(404).json({
        msg: 'No id input',
        success: false,
      });
    }
    const { id } = req.params;
    const result = await Admin.findById(id);
    return res.status(200).json({
      data: result,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'Error finding the admin',
      success: false,
    });
  }
};

export const delAdmin = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'No id input',
        success: false,
      });
    }
    const result = await Admin.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        msg: 'Admin has not founded',
        success: false,
      });
    }
    return res.status(200).json({
      data: result,
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      msg: 'An error ocurred while deleting the admin specified',
      success: false,
    });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const admins = await Admin.find(req.query);
    return res.status(200).json({
      data: admins,
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      msg: 'An error ocurred',
      success: false,
    });
  }
};
