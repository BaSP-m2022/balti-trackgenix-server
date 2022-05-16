import Joi from 'joi';

const createSuperAdminValidation = (req, res, next) => {
  const superAdminObj = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    isActive: Joi.boolean().required(),
  });
  const valid = superAdminObj.validate(req.body);
  if (valid.error) {
    return res.status(400).json({
      msg: 'There was an error',
      success: valid.error.details[0].message,
    });
  }
  return next();
};

const updateSuperAdminValidation = (req, res, next) => {
  const superAdminObJ = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string(),
    password: Joi.string(),
    isActive: Joi.boolean(),
  });
  const valid = superAdminObJ.validate(req.body);
  if (valid.error) {
    return res.status(400).json({
      msg: 'There was an error',
      success: valid.error.details[0].message,
    });
  }
  return next();
};

export default {
  createSuperAdminValidation,
  updateSuperAdminValidation,
};
