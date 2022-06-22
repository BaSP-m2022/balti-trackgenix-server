import joi from 'joi';

const createProjectValidation = (req, res, next) => {
  const employeesSchema = joi.object({
    employeeId: joi.string().required().label('Employee ID'),
    role: joi
      .string()
      .valid('DEV', 'QA', 'PM', 'TL')
      .insensitive()
      .required()
      .label('Role'),
    rate: joi
      .number()
      .min(0)
      .precision(2)
      .required()
      .label('Rate'),
    hoursInProject: joi
      .number()
      .min(0)
      .precision(1)
      .required()
      .label('Hours In Project'),
  });

  const projectValidation = joi.object({
    projectName: joi
      .string()
      .min(1)
      .max(30)
      .pattern(/^[A-Za-z0-9 ]+$/)
      .required()
      .label('Project name'),
    description: joi
      .string()
      .min(10)
      .max(140)
      .allow('')
      .label('Description'),
    isActive: joi.boolean(),
    admin: joi.string().required().label('Admin'),
    client: joi
      .string()
      .min(1)
      .max(20)
      .pattern(/^[A-Za-z0-9 ]+$/)
      .required()
      .label('Client'),
    startDate: joi.date().required().label('Start Date'),
    endDate: joi.date().min(joi.ref('startDate')).allow('').label('End Date'),
    employees: joi.array().items(employeesSchema).label('Employee'),
  });

  const validation = projectValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  return next();
};
const updateProjectValidation = (req, res, next) => {
  const employeesSchema = joi.object({
    employeeId: joi.string().label('Employee ID'),
    role: joi
      .string()
      .valid('DEV', 'QA', 'PM', 'TL')
      .insensitive()
      .label('Role'),
    rate: joi
      .number()
      .min(0)
      .precision(2)
      .label('Rate'),
    hoursInProject: joi
      .number()
      .min(0)
      .precision(1)
      .label('Hours In Project'),
  });
  const projectValidation = joi.object({
    projectName: joi
      .string()
      .min(1)
      .max(30)
      .pattern(/^[A-Za-z0-9 ]+$/)
      .label('Project name'),
    description: joi
      .string()
      .min(10)
      .max(140)
      .allow('')
      .label('Description'),
    isActive: joi.boolean(),
    admin: joi.string().label('Admin'),
    client: joi
      .string()
      .min(1)
      .max(20)
      .pattern(/^[A-Za-z0-9 ]+$/)
      .label('Client'),
    startDate: joi.date().label('Start Date'),
    endDate: joi.date().min(joi.ref('startDate')).allow('').label('End Date'),
    employees: joi.array().items(employeesSchema).label('Employee'),
  });
  const validation = projectValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export {
  createProjectValidation,
  updateProjectValidation,
};
