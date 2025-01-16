import CompanyModel from "../model/company.js";

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
    const companies = await CompanyModel.find();
    res.status(200).json({
      status: "success",
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
    const companyId = req.params.id;
    const company = await CompanyModel.findById(companyId);
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
    const companyId = req.params.id;
    const company = await CompanyModel.findByIdAndDelete(companyId);
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
    const companyId = req.params.id;
    const company = await CompanyModel.findByIdAndUpdate(companyId, req.body, {
      runValidators: true,
      new: true,
    });
    res.status(204).json(company);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}
