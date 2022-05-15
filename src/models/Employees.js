const mongoose = require('mongoose');

const { Schema } = mongoose;

const employeeSchemma = new Schema({
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
    required: true,
  },
});

export default mongoose.model('employeeSchema', employeeSchemma);

module.exports = mongoose.model('Employee', employeeSchemma);
