import express from "express";
import {
  addCompany,
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
} from "./../handler/companyhandler.js";

const router = express.Router();
router.route("/").post(addCompany).get(getCompanies);
router.route("/:id").get(getCompany).patch(updateCompany).delete(deleteCompany);

export default router;
