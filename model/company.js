import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "the companyName must be provided"],
    },
    logo: {
      type: String,
      required: [true, "you must provide a path to the company logo"],
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

export default mongoose.model("Company", companySchema);
