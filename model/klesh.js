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
    NO: { type: Number },
  },
  {
    timestamps: true,
  }
);
kleshSchema.pre("save", async function (next) {
  if (this.isNew && !this.NO) {
    const lastDoc = await this.constructor
      .findOne({ company: this.company })
      .sort("-NO");
    this.NO = lastDoc ? lastDoc.NO + 1 : 1;
  }
  next();
});
export default mongoose.model("Klesh", kleshSchema);
