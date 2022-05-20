import express from 'express';
import adminControllers from '../controllers/admins';
import adminValidations from '../validations/admins';

const router = express.Router();

router.get('/', adminControllers.getAllAdmins);
router.post('/', adminValidations.createAdminValidation, adminControllers.addAdmin);
router.put('/:id', adminValidations.updateAdminValidation, adminControllers.updateAdmin);
router.get('/:id', adminControllers.findAdminById);
router.delete('/:id', adminControllers.delAdmin);

export default router;
