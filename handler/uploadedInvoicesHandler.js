import UploadedInvoicesModel from "../model/uploadedInvoices.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export async function uploadInvoice(req, res) {
  try {
    const { filename } = req.file;
    const { company, name } = req.body;
    const uploadedInvoice = await UploadedInvoicesModel.create({
      filePath: filename,
      company,
      name,
    });
    res.status(200).json({
      status: "success",
      data: {
        uploadedInvoice,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

export async function getUploadedInvoices(req, res) {
  try {
    const uploadedInvoices = await UploadedInvoicesModel.find({
      company: req.query.companyId,
    });
    res.status(200).json({
      status: "success",
      result: uploadedInvoices.length,
      data: {
        uploadedInvoices,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

export async function getUploadedInvoice(req, res) {
  try {
    const { id } = req.params;
    res.download(`../public/uploadedInvoicesImg/${id}`);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

export async function deleteUploadedInvoice(req, res) {
  try {
    const uploadedInvoice = await UploadedInvoicesModel.findByIdAndDelete(
      req.params.id
    );
    const filePath = path.join(
      __dirname,
      `../public/uploadedInvoicesImg/`,
      uploadedInvoice.filePath
    );
    console.log(filePath);
    await fs.unlink(filePath);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}
