import Joi from 'joi';

export const validateTimeSheetCreation = (req, res, next) => {
  const createTimeSheet = Joi.object({
    employee: Joi.string().min(3).max(30).required(),
    project: Joi.string().min(3).max(30).required(),
    role: Joi.string().min(2).max(3).required(),
    date: Joi.date().greater('1-1-2022').less('now'),
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
    employee: Joi.string().min(3).max(30),
    project: Joi.string().min(3).max(30),
    role: Joi.string().min(2).max(3),
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
