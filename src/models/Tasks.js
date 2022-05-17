import mongoose from 'mongoose';

const { Schema } = mongoose;

const tasksSchema = new Schema({
  employeeId: {
    type: String,
    required: false,
  },
  projectId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: false,
  },
  done: {
    type: Boolean,
    default: false,
    required: true,
  },
});

export default mongoose.model('Tasks', tasksSchema);
