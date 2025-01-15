import mongoose from "mongoose";
import costSchema from "./cost";

const transactionSchema = new mongoose.Schema(
  {
    transactionType: {
      type: String,
      required: [true, "you must provide the transaction type"],
      enum: ["buy", "sell"],
    },
    companyId: {
      type: mongoose.Types.ObjectId,
      required: [true, "you must provide an companyId"],
    },
    productId: {
      type: mongoose.Types.ObjectId,
      required: [true, "you must provide an productId"],
    },
    cost: costSchema,
    quantity: {
      type: Number,
      required: [true, "the quantity must be provided"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
