import mongoose from "mongoose";

const buyTransactionSchema = new mongoose.Schema(
  {
    transactionType: {
      type: String,
      required: [true, "you must specify the type of transaction"],
      enum: ["buy"],
    },
    companyId: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
      required: [true, "you must provide a companyId"],
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: [true, "you must provide a productId"],
    },
    costPerUnit: costSchema,
    otherExpenses: [costSchema],
    quantity: {
      type: Number,
      required: [true, "the quantity must be provided"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("BuyTransaction", buyTransactionSchema);
