import mongoose, { Schema } from "mongoose";

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: [true, "the product must have a name"],
  },
  brand: {
    type: mongoose.Types.ObjectId,
    required: [true, "the brand for the product must be specified"],
  },
});

export default new mongoose.model("Product", productSchema);
