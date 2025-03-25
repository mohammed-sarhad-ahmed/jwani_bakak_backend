import mongoose from "mongoose";
import Exchange from "./exchange.js";

const sellTransaction = new mongoose.Schema(
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
          ref: "ComposedProduct",
          required: [true, "you must provide an composed productId"],
        },
      ],
      validate: {
        validator: function (products) {
          return products.length > 0;
        },
        message: "Products array cannot be empty",
      },
    },
  },
  {
    timestamps: true,
  }
);
sellTransaction.pre("save", async function (next) {
  if (this.isNew) {
    const latestExchange = await Exchange.findOne().sort({ createdAt: -1 });
    if (latestExchange) {
      this.exchangeRate = latestExchange.rate;
    }
  }
  next();
});

export default mongoose.model("SellTransaction", sellTransaction);
