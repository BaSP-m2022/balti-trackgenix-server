// import TaskSchemas from '../models/Tasks';
const joi = require('joi');

const authSchemaPostAndPut = joi.object({
  id: joi.string().required(),
  employee_id: joi.string(),
  pm_id: joi.string().required(),
  tittle: joi.string().required(),
  description: joi.string().max(50),
  date: joi.date(),
  done: joi.boolean().required(),
});

const authSchemaId = joi.object({
  id: joi.string().required(),
});

exports = {
  authSchemaPostAndPut,
  authSchemaId,
};
