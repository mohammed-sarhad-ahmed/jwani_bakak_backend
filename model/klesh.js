import mongoose from "mongoose";

const kleshSchema = new mongoose.Schema(
  {
    note: {
      type: String,
      required: [true, "you must provide the body of the klesh"],
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
