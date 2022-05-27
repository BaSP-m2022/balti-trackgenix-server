import joi from 'joi';

export const validatePost = async (req, res, next) => {
  const schemaValidate = joi.object({
    employeeId: joi.string(),
    projectId: joi.string().required(),
    title: joi.string().max(30).required(),
    description: joi.string().max(100),
    date: joi.date(),
    done: joi.boolean().required(),
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
    employeeId: joi.string(),
    projectId: joi.string(),
    title: joi.string().max(30),
    description: joi.string().max(100),
    date: joi.date(),
    done: joi.boolean(),
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
