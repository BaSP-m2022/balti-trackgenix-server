import Joi from 'joi';

const createAdminValidation = (req, res, next) => {
  const newAdmin = Joi.object({
    firstName: Joi.string().min(4).max(15).required(),
    lastName: Joi.string().min(4).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    isActive: Joi.boolean().required(),
  });
  const valid = newAdmin.validate(req.body);
  if (valid.error) {
    return res.status(400).json({
      msg: valid.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  return next();
};

const updateAdminValidation = (req, res, next) => {
  const updateAdmin = Joi.object({
    firstName: Joi.string().min(4).max(15),
    lastName: Joi.string().min(4).max(15),
    email: Joi.string().email(),
    password: Joi.string().min(8),
    isActive: Joi.boolean(),
  });
  const valid = updateAdmin.validate(req.body);
  if (valid.error) {
    return res.status(400).json({
      msg: valid.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  createAdminValidation,
  updateAdminValidation,
};
