import { String, Boolean } from 'joi';
import mongoose from 'mongoose';

const tasksSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: false,
  },
  projectId: {
    type: String,
    required: true,
  },
  tittle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  date: {
    type: Boolean,
    required: false,
  },
  done: {
    type: Boolean,
    required: true,
  },
});

const Tasks = mongoose.model('Tasks', tasksSchema);
exports = Tasks;
