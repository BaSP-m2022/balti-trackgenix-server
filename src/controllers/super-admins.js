import ModelSuperAdmin from '../models/Super-admins';

const getAllSuperAdmin = async (req, res) => {
  try {
    const allSuperAdmin = await ModelSuperAdmin.find({});
    return res.status(200).json({
      success: true,
      data: allSuperAdmin,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      msg: 'There was an error',
    });
  }
};

const crateSuperAdmin = async (req, res) => {
  try {
    const superAdminCreate = new ModelSuperAdmin({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      isActive: req.isActive.isActive,
    });
    const result = await superAdminCreate.modelSuperAdmin.save();
    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      msg: 'There was an error',
    });
  }
};

const updateSuperAdmin = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        success: false,
        msg: 'Missing id parameter',
      });
    }
    const result = await ModelSuperAdmin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        success: false,
        msg: 'The Super Admin has not been found',
      });
    }
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      msg: 'There was an error',
    });
  }
};

const findSuperAdminById = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(404).json({
        success: false,
        msg: 'You must specify an id',
      });
    }
    const { id } = req.params;
    const result = await ModelSuperAdmin.findById(id);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: 'There was an error',
    });
  }
};

const deleteSuperAdmin = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        msg: 'Missing id parameter',
      });
    }
    const result = await ModelSuperAdmin.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        success: false,
        msg: 'The Super Admin has not been found',
      });
    }
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      msg: 'There was an error',
    });
  }
};

export default {
  getAllSuperAdmin,
  crateSuperAdmin,
  updateSuperAdmin,
  deleteSuperAdmin,
  findSuperAdminById,
};
