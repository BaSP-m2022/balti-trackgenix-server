import Joi from 'joi';

const createProjectValidation = (req, res, next) => {
  const employeesSchema = Joi.object({
    employeeId: Joi.number().required(),
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
    endDate: Joi.date().optional(),
    employees: Joi.array().items(employeesSchema),
  });

  const validation = projectValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      msg: 'Error during validation, check all the parameters',
      error: validation.error.details[0].message,
    });
  }
  return next();
};

export default {
  createProjectValidation,
};
