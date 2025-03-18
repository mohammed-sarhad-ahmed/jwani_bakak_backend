import mongoose from "mongoose";

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

export default mongoose.model("BuyTransaction", buyTransaction);
