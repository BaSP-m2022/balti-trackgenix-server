import mongoose from 'mongoose';

const { Schema } = mongoose;

const superAdminSchema = new Schema(
  {
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
    isActive: {
      type: Boolean,
      required: true,
    },
    firebaseUid: {
      type: String, required: false,
    },
  },
);

export default mongoose.model('super-admin', superAdminSchema);
