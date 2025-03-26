import InvoiceModel from "../model/invoice.js";

export async function addInvoice(req, res) {
  try {
    const invoice = await InvoiceModel.create(req.body);
    const copyInvoice = await InvoiceModel.findById(invoice._id)
      .populate("company")
      .populate({
        path: "transaction",
        populate: {
          path: "products",
        },
      });
    res.status(200).send({
      message: "success",
      data: {
        invoice: copyInvoice,
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
    })
      .populate({
        path: "transaction",
        populate: {
          path: "products",
        },
      })
      .populate("company");
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
    const invoice = await InvoiceModel.findById(req.params.id)
      .populate({
        path: "transaction",
        populate: {
          path: "products",
        },
      })
      .populate("company");
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
    const invoice = await InvoiceModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate({
        path: "transaction",
        populate: {
          path: "products",
        },
      })
      .populate("company");
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
