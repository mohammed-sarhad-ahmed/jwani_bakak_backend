import mongoose from 'mongoose';

const uploadedInvoicesSchema = new mongoose.Schema(
  {
    filePath: {
      type: String,
      required: [true, 'provide the path for the file'],
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: 'Company',
      required: [true, 'you must provide an companyId'],
    },
    name: {
      type: String,
      required: [true, 'provide a name'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('uploadedInvoices', uploadedInvoicesSchema);
