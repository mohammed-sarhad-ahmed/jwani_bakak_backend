import express from "express";
import {
  addInvoice,
  deleteInvoice,
  getInvoice,
  getInvoices,
  updateInvoice,
} from "../handler/invoiceHandler";

const router = express.Router();

router.route("/").get(addInvoice).get(getInvoices);
router.route("/:id").get(getInvoice).patch(updateInvoice).delete(deleteInvoice);

export default router;
