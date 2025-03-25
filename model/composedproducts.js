import mongoose from "mongoose";
import Exchange from "./exchange.js";

const ComposedProductSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: [true, "you must provide an product id"],
    },
    quantity: {
      type: Number,
      required: [true, "the quantity must be provided"],
    },
    pricePerUnit: {
      type: Number,
      required: [true, "the pricePerUnit must be provided"],
    },
    exchange: {
      type: mongoose.Types.ObjectId,
      ref: "Exchange",
      required: [true, "you must provide an Exchange rate"],
    },
  },
  {
    timestamps: true,
  }
);

ComposedProductSchema.pre("save", async function (next) {
  if (this.isNew) {
    const latestExchange = await Exchange.findOne().sort({ createdAt: -1 });
    if (latestExchange) {
      this.exchangeRate = latestExchange._id;
    }
  }
  next();
});

export default mongoose.model("ComposedProduct", ComposedProductSchema);
