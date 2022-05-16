import express from 'express';
import superAdminControllers from '../controllers/super-admins';
import superAdminValidations from '../validations/super-admins';

const router = express.Router();

router
  .get('/', superAdminControllers.getSuperAdminByFilter)
  .get('/:id', superAdminControllers.findSuperAdminById)
  .post('/', superAdminValidations.createSuperAdminValidation, superAdminControllers.crateSuperAdmin)
  .delete('/:id', superAdminControllers.deleteSuperAdmin)
  .put('/:id', superAdminValidations.updateSuperAdminValidation, superAdminControllers.updateSuperAdmin);

export default router;
