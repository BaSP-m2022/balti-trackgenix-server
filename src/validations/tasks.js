import joi from 'joi';

export const validatePost = (req, res, next) => {
  const schemaValidate = joi.object({
    employee_id: joi.string(),
    pm_id: joi.string().required(),
    tittle: joi.string().required(),
    description: joi.string().max(50),
    date: joi.date(),
    done: joi.boolean().required(),
  });
  const result = schemaValidate.validate(req.body);
  if (result.error) {
    return res.status(400).json({
      message: 'Error, incorrectly entered the data of the body.',
      error: true,
    });
  }
  return next();
};

export const validatePut = (req, res, next) => {
  const schemaValidate = joi.object({
    employee_id: joi.string(),
    pm_id: joi.string(),
    tittle: joi.string(),
    description: joi.string().max(50),
    date: joi.date(),
    done: joi.boolean(),
  });
  const result = schemaValidate.validate(req.body);
  if (result.error) {
    return res.status(400).json({
      message: 'Error, incorrectly entered the data of the body.',
      error: true,
    });
  }
  return next();
};
