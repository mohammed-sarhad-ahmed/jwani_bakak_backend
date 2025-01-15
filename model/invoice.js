import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
      required: [true, "you must provide an companyId"],
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: [true, "you must provide an productId"],
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
