import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Types.ObjectId,
      required: [true, "you must provide an companyId"],
    },
    productId: {
      type: mongoose.Types.ObjectId,
      required: [true, "you must provide an productId"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Invoice", invoiceSchema);
