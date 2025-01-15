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
  },
  {
    timestamps: true,
  }
);
