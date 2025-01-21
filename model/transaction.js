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
    pricePerUnit: {
      type: Number,
      required: [true, "the pricePerUnit must be provided"],
    },
  },
  {
    timestamps: true,
    discriminatorKey: "transactionType",
  }
);

const transactionModel = mongoose.model("Transaction", transactionSchema);

const sellTransactionSchema = new mongoose.Schema({
  buyTransaction: {
    type: mongoose.Schema.ObjectId,
    ref: "Sell",
    required: [true, "the buy transaction must be specified"],
  },
});

const buyTransactionSchema = new mongoose.Schema({
  expenses: [
    {
      expense: {
        type: String,
        required: [true, "the name of the expense should be provided"],
      },
      amount: {
        type: Number,
        required: [true, "the amount of the expense should be provided"],
      },
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
