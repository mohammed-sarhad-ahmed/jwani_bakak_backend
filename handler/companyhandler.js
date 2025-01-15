import CompanyModel from "../model/company.js";

export async function addCompany(req, res) {
  try {
    const { address, companyName, logoPath } = req.body;
    const product = await CompanyModel.create({
      companyName,
      address,
      logoPath,
    });
    res.status(200).json({
      status: "succuss",
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}
