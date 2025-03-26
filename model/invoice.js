import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
      required: [true, "you must provide an companyId"],
    },
    type: {
      type: String,
      enum: ["BuyTransaction", "SellTransaction"],
      required: true,
    },
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "type",
    },
    addressedTo: {
      type: String,
      required: [true, "provide the name of the person it is addressed to"],
    },
    buyer: {
      type: String,
      required: [true, "provide the name of the buyer"],
    },
    seller: {
      type: String,
      required: [true, "provide the name of the seller"],
    },
    NO: { type: Number },
  },
  {
    timestamps: true,
  }
);
invoiceSchema.pre("save", async function (next) {
  if (this.isNew && !this.NO) {
    const lastDoc = await this.constructor
      .findOne({ company: this.company })
      .sort("-NO");
    this.NO = lastDoc ? lastDoc.NO + 1 : 1;
  }
  next();
});

const InvoiceModel = mongoose.model("Invoice", invoiceSchema);

export default InvoiceModel;
