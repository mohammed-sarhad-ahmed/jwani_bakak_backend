import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Types.ObjectId,
      ref: 'Company',
      required: [true, 'you must provide an companyId'],
    },
    transactions: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: 'Transaction',
          required: [true, 'you must provide a transactionId'],
        },
      ],
      required: [true, 'you must provide transactions'],
    },
    addressedTo: {
      type: String,
      required: [true, 'provide the name of the person it is addressed to'],
    },
    buyer: {
      type: String,
      required: [true, 'provide the name of the buyer'],
    },
    seller: {
      type: String,
      required: [true, 'provide the name of the seller'],
    },
  },
  {
    timestamps: true,
  }
);
// invoiceSchema.post(/^find/, async function (doc, next) {
//   const invoices = await InvoiceModel.find({ transactions: doc._id });
//   console.log(invoices.length);
//   // for (let i = 0; i < invoices.length; i++) {
//   //   if (invoices[i].transactions.length === 0) {
//   //     const invoice = await InvoiceModel.findByIdAndDelete(invoices[i]._id);
//   //     console.log(invoice);
//   //   }
//   // }
//   next();
// });
const InvoiceModel = mongoose.model('Invoice', invoiceSchema);

export default InvoiceModel;
