import mongoose from 'mongoose';

const timeSheetSchema = new mongoose.Schema({
  employee: {
    type: String, // employeeId mongoose.SchemaTypes.ObjectId
    required: true,
  },
  project: {
    type: String, // projectId
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  workedHours: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  task: {
    type: String, // taskId
    required: false,
  },
});

export default mongoose.model('timeSheetSchema', timeSheetSchema);
// const timeSheetSchema = require('./timeSheetSchema')
