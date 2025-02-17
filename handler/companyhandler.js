import CompanyModel from '../model/company.js';
import { pagination } from '../helper/pagination.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import TransactionModel from '../model/company.js';
import ProductModel from '../model/product.js';
import KleshModel from '../model/klesh.js';
import InvoiceModel from '../model/invoice.js';
import UploadedInvoiceModel from '../model/uploadedInvoices.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function addCompany(req, res) {
  try {
    const { address, companyName } = req.body;
    const { filename } = req.file;
    const company = await CompanyModel.create({
      companyName,
      address,
      logo: filename,
    });
    res.status(200).json({
      status: 'succuss',
      data: {
        company,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
}

export async function getCompanies(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = pagination(page, limit);
    if (req.query.page) {
      const numberOfCompanies = await CompanyModel.countDocuments();
      if (skip >= numberOfCompanies && numberOfCompanies !== 0)
        throw new Error('the page was not found');
    }
    const companies = await CompanyModel.find().skip(skip).limit(limit);
    res.status(200).json({
      status: 'success',
      results: companies.length,
      data: {
        companies,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
}

export async function getCompany(req, res) {
  try {
    const company = await CompanyModel.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        company,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
}

export async function deleteCompany(req, res) {
  try {
    const company = await CompanyModel.findByIdAndDelete(req.params.id);
    const filePath = path.join(__dirname, `../public/img/`, company.logo);
    await fs.unlink(filePath);
    const uploadedInvoices = await UploadedInvoiceModel.find({
      company: company._id,
    });
    for (const uploadedInvoice of uploadedInvoices) {
      const filePath = path.join(
        __dirname,
        `../public/uploadedInvoicesImg/`,
        uploadedInvoice.filePath
      );

      await fs.unlink(filePath);
    }
    await TransactionModel.deleteMany({ company: req.params.id });
    await ProductModel.deleteMany({ company: req.params.id });
    await KleshModel.deleteMany({ company: req.params.id });
    await InvoiceModel.deleteMany({ company: req.params.id });
    await UploadedInvoiceModel.deleteMany({
      company: req.params.id,
    });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
}

export async function updateCompany(req, res) {
  try {
    const { filename } = req.file;
    const oldCompany = await CompanyModel.findById(req.params.id);
    const filePath = path.join(__dirname, `../public/img/`, oldCompany.logo);
    await fs.unlink(filePath);
    const company = await CompanyModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body, logo: filename },
      {
        runValidators: true,
        new: true,
      }
    );
    res.status(200).json({
      status: 'success',
      data: {
        company,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
}
