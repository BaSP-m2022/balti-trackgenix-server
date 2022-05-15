import express from 'express';
import superAdminControllers from '../controllers/super-admins';

const router = express.Router();

router
  .get('/', superAdminControllers.getSuperAdminByFilter)
  .get('/:id', superAdminControllers.findSuperAdminById)
  .post('/', superAdminControllers.crateSuperAdmin)
  .delete('/:id', superAdminControllers.deleteSuperAdmin)
  .put('/:id', superAdminControllers.updateSuperAdmin);

export default router;
