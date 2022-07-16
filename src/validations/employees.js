import Joi from 'joi';

const currentDate = new Date();
const minBirthDate = new Date(
  currentDate.getFullYear() - 70,
  currentDate.getMonth(),
  currentDate.getDate(),
);
const maxBirthDate = new Date(
  currentDate.getFullYear() - 18,
  currentDate.getMonth(),
  currentDate.getDate(),
);

export const createValidation = (req, res, next) => {
  const employeeValidate = Joi.object({
    firstName: Joi.string().min(3).max(10).required(),
    lastName: Joi.string().min(3).max(10).required(),
    email: Joi.string().email().required(),
    assignedProjects: Joi.array(),
    isActive: Joi.boolean().required(),
    password: Joi.string().min(8).required(),
    secretWord: Joi.string()
      .min(2)
      .max(20)
      .regex(/^[A-Za-z]+$/)
      .allow(''),
    address: Joi.string()
      .min(5)
      .max(40)
      .regex(/^[A-Za-z0-9 ]+$/)
      .allow(''),
    birthDate: Joi.date()
      .min(minBirthDate)
      .max(maxBirthDate)
      .allow(''),
  });
  const validation = employeeValidate.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export const updateValidation = (req, res, next) => {
  const employeeValidate = Joi.object({
    firstName: Joi.string().min(3).max(10),
    lastName: Joi.string().min(3).max(10),
    assignedProjects: Joi.array(),
    isActive: Joi.boolean(),
    password: Joi.string().min(8),
    secretWord: Joi.string()
      .min(2)
      .max(20)
      .regex(/^[A-Za-z]+$/)
      .allow(''),
    address: Joi.string()
      .min(5)
      .max(40)
      .regex(/^[A-Za-z0-9 ]+$/)
      .allow(''),
    birthDate: Joi.date()
      .min(minBirthDate)
      .max(maxBirthDate)
      .allow(''),
  });
  const validation = employeeValidate.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  return next();
};
