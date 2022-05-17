import joi from 'joi';

const validatePost = async (req, res, next) => {
  const schemaValidate = joi.object({
    employeeId: joi.string(),
    projectId: joi.string().required(),
    title: joi.string().max(30).required(),
    description: joi.string().max(100),
    date: joi.date(),
    done: joi.boolean().required(),
  });
  const result = await schemaValidate.validateAsync(req.body);
  console.log('aca abajo esta el resultado');
  console.log(result);
  // como entro a este if ?
  if (result) {
    return res.status(400).json({
      message: 'Error, incorrectly entered the data of the body.',
      error: true,
    });
  }
  return next();
};
export default validatePost;
// export const validatePut = async (req, res, next) => {
//   const schemaValidate = joi.object({
//     employee_id: joi.string(),
//     pm_id: joi.string(),
//     tittle: joi.string().max(30),
//     description: joi.string().max(100),
//     date: joi.date(),
//     done: joi.boolean(),
//   });
//   const result = await schemaValidate.validateAsync(req.body);
//   console.log('console log: ', result);
//   // como entro a este if ?
//   if (!result) {
//     return res.status(400).json({
//       message: 'Error, incorrectly entered the data of the body.',
//       error: true,
//     });
//   }
//   return next();
// };
