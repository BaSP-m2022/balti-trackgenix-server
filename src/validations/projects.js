import Joi from 'joi';

const createProjectValidation = (req, res, next) => {
  const employeesSchema = Joi.object({
    employeeId: Joi.string().required(),
    role: Joi.string().valid('DEV', 'QA', 'PM', 'TL').required(),
    rate: Joi.number().required(),
    hoursInProject: Joi.number().required(),
  });

  const projectValidation = Joi.object({
    projectName: Joi.string().min(1).max(20).required(),
    description: Joi.string().min(10).max(140).optional(),
    isActive: Joi.boolean().required(),
    admin: Joi.string().required(),
    client: Joi.string().min(1).max(20).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date(),
    employees: Joi.array().items(employeesSchema),
  });

  const validation = projectValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'Error during validation, check all the parameters',
      data: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};
const updateProjectValidation = (req, res, next) => {
  const employeesSchema = Joi.object({
    employeeId: Joi.string(),
    role: Joi.string().valid('DEV', 'QA', 'PM', 'TL'),
    rate: Joi.number().positive(),
    hoursInProject: Joi.number().positive(),
  });
  const projectValidation = Joi.object({
    projectName: Joi.string().min(1).max(30),
    description: Joi.string().min(10).max(140),
    isActive: Joi.boolean(),
    admin: Joi.string(),
    client: Joi.string().min(1).max(20),
    startDate: Joi.date(),
    endDate: Joi.date(),
    employees: Joi.array().items(employeesSchema),
  });
  const validation = projectValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'Error during data validation!',
      data: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};

export {
  createProjectValidation,
  updateProjectValidation,
};
