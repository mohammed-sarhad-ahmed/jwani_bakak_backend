import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
      required: [true, "you must provide an companyId"],
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: [true, "you must provide an productId"],
    },
    quantity: {
      type: Number,
      required: [true, "the quantity must be provided"],
    },
    currency: {
      type: String,
      required: [true, "provide the currency for the transaction"],
    },
  },
  {
    timestamps: true,
    discriminatorKey: "transactionType",
  }
);

const transactionModel = mongoose.model("Transaction", transactionSchema);

const sellTransactionSchema = new mongoose.Schema({
  sellingPrice: {
    type: Number,
    required: [true, "you must provide the price that the product was sold at"],
  },
});

const buyTransactionSchema = new mongoose.Schema({
  costPerUnit: {
    type: Number,
    required: [true, "the cost must be provided"],
  },
  otherExpenses: [
    {
      type: Number,
    },
  ],
});
const sellTransactionModel = transactionModel.discriminator(
  "Sell",
  sellTransactionSchema
);
const buyTransactionModel = transactionModel.discriminator(
  "Buy",
  buyTransactionSchema
);

export { sellTransactionModel, buyTransactionModel, transactionModel };
