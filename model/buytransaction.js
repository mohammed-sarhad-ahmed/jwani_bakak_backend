import mongoose from "mongoose";
const ComposedProductSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: [true, "you must provide an productId"],
    },
    quantity: {
      type: Number,
      required: [true, "the quantity must be provided"],
    },
    pricePerUnit: {
      type: Number,
      required: [true, "the pricePerUnit must be provided"],
    },
  },
  {
    timestamps: true,
  }
);

const ComposedProductModel = new mongoose.model(
  "ComposedProduct",
  ComposedProductSchema
);

const buyTransaction = new mongoose.Schema(
  {
    company: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
      required: [true, "you must provide an companyId"],
    },
    currency: {
      type: String,
      required: [true, "provide the currency for the transaction"],
    },
    label: {
      type: String,
      required: true,
    },
    products: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "ComposedProductModel",
          required: [true, "you must provide an composed productId"],
        },
      ],
      required: [true, "you must provide a products for the transaction"],
    },
  },
  {
    timestamps: true,
  }
);

const BuyTransactionModel = mongoose.model("BuyTransaction", buyTransaction);
