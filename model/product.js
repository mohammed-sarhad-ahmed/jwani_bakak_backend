import mongoose from "mongoose";

mongoose.Schema({
  productName: {
    type: String,
    required: [true, "the product must have a name"],
  },
  brand: {
    type: mongoose.Types.ObjectId,
    required: [true, "the brand for the product must be specified"],
  },
});
