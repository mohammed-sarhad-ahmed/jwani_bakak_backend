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
    expenses: [
      {
        name: {
          type: String,
          required: [true, "the name of the expense should be provided"],
        },
        amount: {
          type: Number,
          required: [true, "the amount of the expense should be provided"],
        },
      },
    ],
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

export default mongoose.model("BuyTransaction", buyTransaction);
