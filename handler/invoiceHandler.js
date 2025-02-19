import { pagination } from '../helper/pagination.js';
import InvoiceModel from '../model/invoice.js';

export async function addInvoice(req, res) {
  try {
    const invoice = await InvoiceModel.create(req.body);
    await invoice.populate({
      path: 'transactions',
      populate: {
        path: 'product',
      },
    });
    res.status(200).json({
      status: 'success',
      data: {
        invoice,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
}
export async function getInvoices(req, res) {
  try {
    const { page = 1, limit = 10, companyId } = req.query;
    const skip = pagination(page, limit);
    if (req.query.page) {
      const numberOfInvoices = await InvoiceModel.countDocuments();

      if (skip >= numberOfInvoices && numberOfInvoices !== 0)
        throw new Error('the page was not found');
    }
    const invoices = await InvoiceModel.find({
      ...(companyId ? { company: companyId } : {}),
    })
      .populate({
        path: 'transactions',
        populate: {
          path: 'product',
        },
      })
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      status: 'success',
      results: invoices.length,
      data: {
        invoices,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
}

export async function getInvoice(req, res) {
  try {
    const invoice = await InvoiceModel.findById(req.params.id).populate({
      path: 'transactions',
      populate: {
        path: 'product',
      },
    });
    res.status(200).json({
      status: 'success',
      data: {
        invoice,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
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
      status: 'fail',
      message: error.message,
    });
  }
}

export async function updateInvoice(req, res) {
  try {
    const invoice = await InvoiceModel.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    }).populate({
      path: 'transactions',
      populate: {
        path: 'product',
      },
    });
    res.status(200).json({
      status: 'success',
      data: {
        invoice,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
}
