const express = import('express');
const controller = import('../controllers/auth');
const validations = import('../validations/auth');

const router = express.Router();

const {
  register,
} = controller;

router.post('/register', validations.required, register);

module.exports = router;
