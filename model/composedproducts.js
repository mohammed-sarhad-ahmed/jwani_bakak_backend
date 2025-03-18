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

export default new mongoose.model("ComposedProduct", ComposedProductSchema);
