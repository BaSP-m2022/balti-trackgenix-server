/* eslint-disable import/no-import-module-exports */
import express from 'express';

import {
  getAllAdmins, findAdmin, delAdmin, addAdmin, editAdmin,
} from '../controllers/admins';

const router = express.Router();

router.get('/', getAllAdmins);
router.post('/', addAdmin);
router.get('/:id', findAdmin);
router.put('/:id', editAdmin);
router.delete('/:id', delAdmin);

module.exports = router;
