import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
      required: [true, "you must provide an companyId"],
    },
    transaction: {
      type: mongoose.Types.ObjectId,
      ref: "Transaction",
      required: [true, "you must provide an transactionId"],
    },
    addressedTo: {
      type: String,
      required: [true, "provide the name of the person it is addressed to"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Invoice", invoiceSchema);
