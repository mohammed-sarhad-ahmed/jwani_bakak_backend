import mongoose from "mongoose";

const costSchema = new mongoose.Schema({
  cost: {
    type: Number,
    required: [true, "the cost must be provided"],
  },
});

export default costSchema;
