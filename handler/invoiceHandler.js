import InvoiceModel from "../model/invoice.js";

export async function addInvoice(req, res) {
  try {
    const invoice = await InvoiceModel.create(req.body);
    await InvoiceModel.populate("transaction");
    await InvoiceModel.populate("company");
    res.status(200).send({
      message: "success",
      data: {
        invoice,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}
export async function getInvoices(req, res) {
  try {
    const invoices = await InvoiceModel.find({
      company: req.query.companyId,
    });
    res.status(200).send({
      message: "success",
      data: {
        invoices,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

export async function getInvoice(req, res) {
  try {
    const invoice = await InvoiceModel.findById(req.params.id);
    res.status(200).send({
      message: "success",
      data: {
        invoice,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

export async function deleteInvoice(req, res) {
  try {
    await InvoiceModel.deleteOne({
      _id: req.params._id,
    });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

export async function updateInvoice(req, res) {
  try {
    const invoice = await InvoiceModel.updateOne(req.body, req.params.id, {
      new: true,
      runValidators: true,
    });
    res.status(200).send({
      message: "success",
      data: {
        invoice,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}
