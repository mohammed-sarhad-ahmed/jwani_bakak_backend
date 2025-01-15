import mongoose from "mongoose";

const sellTransactionSchema = new mongoose.Schema(
  {
    transactionType: {
      type: String,
      required: [true, "you must specify the type of transaction"],
      enum: ["sell"],
    },
    companyId: {
      type: mongoose.Types.ObjectId,
      required: [true, "you must provide an companyId"],
    },
    productId: {
      type: mongoose.Types.ObjectId,
      required: [true, "you must provide an productId"],
    },
    quantity: {
      type: Number,
      required: [true, "the quantity must be provided"],
    },
    sellingPrice: {
      type: Number,
      required: [
        true,
        "you must provide the price that the product was sold at",
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("SellTransaction", sellTransactionSchema);
