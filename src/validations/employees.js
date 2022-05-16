import Joi from 'joi';

const employeesValidation = (req, res, next) => {
  const employeeDataValidation = Joi.object({
    firstName: Joi.string().min(3).max(10).required(),
    lastName: Joi.string().min(3).max(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    assignedProjects: Joi.array().items(Joi.number()).optional(),
    isActive: Joi.boolean().required(),
  });

  const validation = employeeDataValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      msg: 'There was an error during the validation of the request',
      data: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};

export default { employeesValidation };
