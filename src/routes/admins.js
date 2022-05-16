import express from 'express';
import {
  getAllAdmins, addAdmin, updateAdmin, findAdminById, delAdmin, getAdmin,
} from '../controllers/admins';

const router = express.Router();

router.get('/', getAllAdmins);
router.post('/', addAdmin);
router.put('/:id', updateAdmin);
router.get('/:id', findAdminById);
router.delete('/:id', delAdmin);
router.get('/', getAdmin);

export default router;
