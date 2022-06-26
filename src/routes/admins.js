import express from 'express';
import adminControllers from '../controllers/admins';
import adminValidations from '../validations/admins';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', authMiddleware, adminControllers.getAllAdmins);
router.post('/', authMiddleware, adminValidations.createAdminValidation, adminControllers.addAdmin);
router.put('/:id', authMiddleware, adminValidations.updateAdminValidation, adminControllers.updateAdmin);
router.get('/:id', authMiddleware, adminControllers.findAdminById);
router.delete('/:id', authMiddleware, adminControllers.delAdmin);

export default router;
