import express from 'express';
import adminControllers from '../controllers/admins';
import adminValidations from '../validations/admins';

const router = express.Router();

router
  .get('/', adminControllers.getAdmins)
  .post('/', adminValidations.validateCreation, adminControllers.createProject)
  .get('/:id', adminControllers.getAdminById)
  .put('/:id', adminControllers.updateAdmin)
  .delete('/:id', adminControllers.deleteAdmin);

export default router;
