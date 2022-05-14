import Joi from 'joi';

export const validateCreation = (req, res, next) => {
  const projectsArray = Joi.object({
    projectId: Joi.number(),
  });
  const employeeCreate = Joi.object({
    firstName: Joi.string().min(3).max(10).required(),
    lastName: Joi.string().min(3).max(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    assignedProjects: Joi.array().items(projectsArray),
    isActive: Joi.boolean().required(),
  });
  const validation = employeeCreate.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'Missing data',
      data: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};

export const validateDeletion = () => {
};
