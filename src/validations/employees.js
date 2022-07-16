import Joi from 'joi';

const employeeValidation = (req, res, next) => {
  const employeValidate = Joi.object({
    firstName: Joi.string().min(3).max(10).required(),
    lastName: Joi.string().min(3).max(10).required(),
    email: Joi.string().email().required(),
    assignedProjects: Joi.array(),
    isActive: Joi.boolean().required(),
    password: Joi.string().min(8).required(),
  });
  const validation = employeValidate.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default employeeValidation;
