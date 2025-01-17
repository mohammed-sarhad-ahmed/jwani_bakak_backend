import InvoiceModel from "../model/invoice.js";

export async function addInvoice(req, res) {
  try {
    const invoice = await InvoiceModel.create(req.body);
    await invoice.populate("company product");
    res.status(200).json({
      status: "success",
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
    const invoices = await InvoiceModel.find().populate("company product");
    res.status(200).json({
      status: "success",
      results: invoices.length,
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
    const invoice = await InvoiceModel.findById(req.params.id).populate(
      "company product"
    );
    res.status(200).json({
      status: "success",
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
    await InvoiceModel.findByIdAndDelete(req.params.id);
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
    const invoice = await InvoiceModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    ).populate("company product");
    res.status(200).json({
      status: "success",
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
