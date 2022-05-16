import mongoose from 'mongoose';

const { Schema } = mongoose;

const timeSheetSchema = new Schema({
  employee: {
    type: String,
    required: true,
  },
  project: {
    type: String,
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
    type: String,
    required: false,
  },
});

export default mongoose.model('Timesheet', timeSheetSchema);
