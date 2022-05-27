import Joi from 'joi';

const employeeValidation = (req, res, next) => {
  const employeValidate = Joi.object({
    firstName: Joi.string().min(3).max(10).required(),
    lastName: Joi.string().min(3).max(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    assignedProjects: Joi.array(),
    isActive: Joi.boolean().required(),
  });
  const validation = employeValidate.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'Missing data',
      data: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};

export default employeeValidation;
