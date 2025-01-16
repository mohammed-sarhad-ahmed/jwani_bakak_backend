import InvoiceModel from "../model/invoice";

export async function addInvoice(req, res) {
  try {
    const invoice = await InvoiceModel.create(req.body);
    res.status(200).json({
      message: "success",
      data: {
        invoice,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "fail",
    });
  }
}

export async function getInvoices(req, res) {
  try {
    const invoices = await InvoiceModel.find();
    res.status(200).json({
      message: "success",
      data: {
        invoices,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "fail",
    });
  }
}

export async function getInvoice(req, res) {
  try {
    const invoice = await InvoiceModel.findById(req.params.id);
    res.status(200).json({
      message: "success",
      data: {
        invoice,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "fail",
    });
  }
}

export async function deleteInvoice(req, res) {
  try {
    await InvoiceModel.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({
      message: "fail",
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
    );
    res.status(200).json({
      message: "success",
      data: {
        invoice,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "fail",
    });
  }
}
