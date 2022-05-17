import ModelSuperAdmin from '../models/Super-admins';

const crateSuperAdmin = async (req, res) => {
  try {
    const superAdminCreate = new ModelSuperAdmin({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      isActive: req.body.isActive,
    });
    const result = await superAdminCreate.save();
    return res.status(201).json({
      msg: 'Request Successful',
      data: result,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      msg: 'There was an error',
      data: undefined,
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
        msg: 'The Super Admin has not been found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      msg: 'Request Successful',
      data: result,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      msg: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};

const findSuperAdminById = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(404).json({
        msg: 'You must specify an id',
        data: undefined,
        error: true,
      });
    }
    const { id } = req.params;
    const result = await ModelSuperAdmin.findById(id);
    return res.status(200).json({
      msg: 'Request Successful',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};

const deleteSuperAdmin = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'Missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await ModelSuperAdmin.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        msg: 'The Super Admin has not been found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      msg: 'Request Successful',
      data: result,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      msg: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};

const getSuperAdminByFilter = async (req, res) => {
  try {
    const allSuperAdmin = await ModelSuperAdmin.find(req.query);
    return res.status(200).json({
      msg: 'Request Successful',
      data: allSuperAdmin,
      error: false,
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
  crateSuperAdmin,
  updateSuperAdmin,
  deleteSuperAdmin,
  findSuperAdminById,
  getSuperAdminByFilter,
};
