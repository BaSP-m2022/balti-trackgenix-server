const mongoose = require('mongoose');

const { Schema } = mongoose;

const employeeSchemma = new Schema({
  id: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  assignedProjects: [
    {
      projectId: { type: Number },
    },
  ],
  isActive: {
    type: Boolean,
  },
});

export default mongoose.model('employee', employeeSchemma);
