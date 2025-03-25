import mongoose from "mongoose";

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

export default mongoose.model("SellTransaction", sellTransaction);
