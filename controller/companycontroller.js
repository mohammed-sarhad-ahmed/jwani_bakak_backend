import express from "express";
import { addCompany } from "./../handler/companyhandler.js";

const router = express.Router();
router.route("/").post(addCompany);

export default router;
