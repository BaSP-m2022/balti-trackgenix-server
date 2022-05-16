import Joi from 'joi';

// eslint-disable-next-line import/prefer-default-export
export const validateTimeSheetCreation = (req, res, next) => {
  const createTimeSheet = Joi.object({
    employee: Joi.string().required(),
    project: Joi.string().required(),
    role: Joi.string().required(),
    rate: Joi.number().required(),
    workedHours: Joi.number().required(),
    description: Joi.string(),
    task: Joi.string(),
  });
  const validation = createTimeSheet.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'Missing data',
      data: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};

export const validateTimeSheetUpdate = (req, res, next) => {
  const updateTimeSheet = Joi.object({
    employee: Joi.string(),
    project: Joi.string(),
    role: Joi.string(),
    rate: Joi.number(),
    workedHours: Joi.number(),
    description: Joi.string(),
    task: Joi.string(),
  });
  const validation = updateTimeSheet.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'Missing data',
      data: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};
