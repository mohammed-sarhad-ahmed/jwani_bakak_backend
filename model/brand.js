import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: [true, "the brandName must be provided"],
    },
    logoPath: {
      type: String,
      required: [true, "you must provide a path to the brand logo"],
    },
    address: {
      type: String,
      required: [true, "the address of the company should be provided"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Brand", brandSchema);
