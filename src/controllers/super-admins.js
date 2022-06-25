import ModelSuperAdmin from '../models/Super-admins';

const createSuperAdmin = async (req, res) => {
  try {
    const superAdminCreate = new ModelSuperAdmin({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      isActive: req.body.isActive,
    });
    const result = await superAdminCreate.save();
    return res.status(201).json({
      message: 'New Super Admin created',
      data: result,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'There was an error',
      data: err,
      error: true,
    });
  }
};

const updateSuperAdmin = async (req, res) => {
  try {
    const result = await ModelSuperAdmin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: 'The Super Admin has not been found',
        data: result,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Super Admin  updated',
      data: result,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'There was an error',
      data: err,
      error: true,
    });
  }
};

const findSuperAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ModelSuperAdmin.findById(id);
    if (!result) {
      return res.status(404).json({
        message: 'The Super Admin has not been found',
        data: result,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Request Successful',
      data: result,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'There was an error',
      data: err,
      error: true,
    });
  }
};

const deleteSuperAdmin = async (req, res) => {
  try {
    const result = await ModelSuperAdmin.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: 'The Super Admin has not been found',
        data: result,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Super Admin  deleted',
      data: result,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'There was an error',
      data: err,
      error: true,
    });
  }
};

const getSuperAdminByFilter = async (req, res) => {
  try {
    const allSuperAdmin = await ModelSuperAdmin.find(req.query);
    return res.status(200).json({
      message: 'Request Successful',
      data: allSuperAdmin,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'There was an error',
      data: err,
      error: true,
    });
  }
};

export default {
  createSuperAdmin,
  updateSuperAdmin,
  deleteSuperAdmin,
  findSuperAdminById,
  getSuperAdminByFilter,
};
