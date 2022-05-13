// import TaskSchemas from '../models/Tasks';
const joi = require('joi');

const authSchema = joi.object({
  employeeId: joi.string(),
  projectId: joi.string().required(),
  tittle: joi.string().required(),
  description: joi.string(),
  // date: joi.date().required(),
  done: joi.boolean().required(),
});

// async function validateSchema(req, res, next) {
//   try {
//     const {
//       employeeId, projectId, tittle, description, done,
//     } = req.body;
//     const result = await authSchema.validateAsync(req.body);
//     if(result === status(200))
//   } catch {

//   }
// }

module.exports = authSchema;
