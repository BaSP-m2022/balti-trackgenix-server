import Joi from 'joi';

const updateProjectValidation = (req, res, next) => {
  const employeesSchema = Joi.object({
    employeeId: Joi.number().positive().max(999999),
    role: Joi.string().valid('DEV', 'QA', 'PM', 'TL'),
    rate: Joi.number().positive(),
    hoursInProject: Joi.number().positive(),
  });
  const projectValidation = Joi.object({
    projectName: Joi.string().min(1).max(30),
    description: Joi.string().min(10).max(140),
    isActive: Joi.boolean(),
    admin: Joi.string().min(1).max(20),
    client: Joi.string().min(1).max(20),
    startDate: Joi.date().greater('1-1-2021').less('now'),
    endDate: Joi.date().greater('1-1-2021').less('now'),
    employees: Joi.array().items(employeesSchema),
  });
  const validation = projectValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      msg: 'Error during data validation!',
      error: validation.error.details[0].message,
    });
  }
  return next();
};

export default updateProjectValidation;
