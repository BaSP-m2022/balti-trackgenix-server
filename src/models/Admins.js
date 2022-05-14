// const { 'string', boolean } = require('joi');
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  firstName: {
    type: 'string',
    required: true,
  },
  lastName: {
    type: 'string',
    required: true,
  },
  email: {
    type: 'string',
    required: true,
  },
  password: {
    type: 'string',
    required: true,
  },
  isActive: {
    type: 'boolean',
    required: true,
  },
});

module.exports = mongoose.model('Admin', adminSchema);
