import mongoose from 'mongoose';

const { Schema } = mongoose;

const tasksSchema = new Schema({
  employeeId: {
    type: String,
    required: false,
    // unique: true,
  },
  projectId: {
    type: String,
    required: true,
    // unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  // date: {
  //   type: Date,
  //   required: false,
  // },
  done: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model('Tasks', tasksSchema);
