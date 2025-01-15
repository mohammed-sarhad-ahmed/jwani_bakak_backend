import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "the product must have a name"],
    },
    companyId: {
      type: mongoose.Types.ObjectId,
      required: [true, "the brand for the product must be specified"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
