import mongoose from "mongoose";

const kleshSchema = new mongoose.Schema(
  {
    note: {
      type: String,
      required: [true, "you must provide the body of the klesh"],
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
      required: [true, "the brand for the product must be specified"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Klesh", kleshSchema);
