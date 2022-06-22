import joi from 'joi';

export const validatePost = async (req, res, next) => {
  const schemaValidate = joi.object({
    employeeId: joi.string().allow('').label('Employee ID'),
    projectId: joi.string().required().label('Project ID'),
    title: joi.string().max(30).required().label('Title'),
    description: joi.string().max(100).allow('').label('Description'),
    date: joi.date().allow('').label('Date'),
    done: joi.boolean().required().label('Done'),
  });

  const result = await schemaValidate.validate(req.body);
  if (result.error) {
    return res.status(400).json({
      message: result.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  return next();
};
export const validatePut = async (req, res, next) => {
  const schemaValidate = joi.object({
    employeeId: joi.string().allow('').label('Employee ID'),
    projectId: joi.string().label('Project ID'),
    title: joi.string().max(30).label('Title'),
    description: joi.string().max(100).allow('').label('Description'),
    date: joi.date().allow('').label('Date'),
    done: joi.boolean().label('Done'),
  });
  const result = await schemaValidate.validate(req.body);
  if (result.error) {
    return res.status(400).json({
      message: result.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  return next();
};
