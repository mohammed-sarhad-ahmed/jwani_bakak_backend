import CompanyModel from "../model/company.js";
import { pagination } from "../helper/pagination.js";

export async function addCompany(req, res) {
  try {
    const { address, companyName, logoPath } = req.body;
    const company = await CompanyModel.create({
      companyName,
      address,
      logoPath,
    });
    res.status(200).json({
      status: "succuss",
      data: {
        company,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
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
      if (skip >= numberOfCompanies) throw new Error("the page was not found");
    }
    const companies = await CompanyModel.find().skip(skip).limit(limit);
    res.status(200).json({
      status: "success",
      results: companies.length,
      data: {
        companies,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

export async function getCompany(req, res) {
  try {
    const company = await CompanyModel.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        company,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

export async function deleteCompany(req, res) {
  try {
    await CompanyModel.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

export async function updateCompany(req, res) {
  try {
    const company = await CompanyModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        company,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}
