import mongoose from "mongoose";
import costSchema from "./cost";

const transactionSchema = new mongoose.Schema(
  {
    transactionType: {
      type: String,
      required: [true, "you must provide the transaction type"],
      enum: ["buy", "sell"],
    },
    brandId: mongoose.Types.ObjectId,
    productId: mongoose.Types.ObjectId,
    cost: costSchema,
    quantity: {
      type: Number,
      required: [true, "the quantity must be provided"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
