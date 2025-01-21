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
    buy: {
      type: {
        type: String,
        required: [true, "provide the name of the buyer"],
      },
    },
    seller: {
      type: {
        type: String,
        required: [true, "provide the name of the seller"],
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Invoice", invoiceSchema);
