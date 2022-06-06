import Joi from 'joi';

const createSuperAdminValidation = (req, res, next) => {
  const superAdminObj = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    isActive: Joi.boolean().required(),
  });
  const valid = superAdminObj.validate(req.body);
  if (valid.error) {
    return res.status(400).json({
      message: valid.error.details[0].message,
      error: true,
    });
  }
  return next();
};

const updateSuperAdminValidation = (req, res, next) => {
  const superAdminObJ = Joi.object({
    firstName: Joi.string().min(3).max(30),
    lastName: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    password: Joi.string().min(8),
    isActive: Joi.boolean(),
  });
  const valid = superAdminObJ.validate(req.body);
  if (valid.error) {
    return res.status(400).json({
      message: valid.error.details[0].message,
      error: true,
    });
  }
  return next();
};

export default {
  createSuperAdminValidation,
  updateSuperAdminValidation,
};
