import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    projectName: { type: String, required: true },
    description: { type: String, required: false },
    isActive: { type: Boolean, required: true },
    // admin: { type: String, required: true },
    admin: { type: Schema.Types.ObjectId, required: true, ref: 'Admin' },
    client: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: false },
    employees:
      [
        {
          employeeId: { type: Schema.Types.ObjectId, required: true, ref: 'Employee' },
          // employeeId: { type: String, required: true },
          role: { type: String, required: true, enum: ['DEV', 'QA', 'PM', 'TL'] },
          rate: { type: Number, required: true },
          hoursInProject: { type: Number, required: true },
        },
      ],
  },
);

export default mongoose.model('Project', projectSchema);
