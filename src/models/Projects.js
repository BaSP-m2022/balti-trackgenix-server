import mongoose from 'mongoose';

const { Schema } = mongoose.Schema;

const {
  string, boolean, date, object, number,
} = require('joi');

const projectSchema = new Schema(
  {
    id: { type: string, required: true },
    description: { type: string, required: false },
    isActive: { type: boolean, required: true },
    admin: { type: string, required: true },
    client: { type: string, required: true },
    startDate: { type: date, required: true },
    endDate: { type: date, required: false },
    employees:
      [{ type: object, required: true },
        {
          id: { type: string, required: true },
          role: { type: string, required: true, enum: ['DEV', 'QA', 'PM', 'TL'] },
          rate: { type: number, required: true },
          hoursInProject: { type: number, required: true },
        },
      ],
  },
);

export default mongoose.model('Project', projectSchema);
