import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    projectName: { type: String, required: true },
    description: { type: String, required: false },
    isActive: { type: Boolean, required: true },
    client: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: false },
    admin: { type: Schema.Types.ObjectId, required: true, ref: 'Admin' },
  },
);

export default mongoose.model('Project', projectSchema);
