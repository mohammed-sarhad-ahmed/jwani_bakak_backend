import mongoose from "mongoose";

const exchangeSchema = new mongoose.Schema(
  {
    rate: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Exchange", exchangeSchema);
