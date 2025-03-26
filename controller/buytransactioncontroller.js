import express from "express";
import {
  addBuyTransaction,
  updateBuyTransaction,
  deleteBuyTransaction,
  getBuyTransaction,
  getBuyTransactions,
  updateComposed,
} from "../handler/handlebuytransaction.js";

const router = express.Router();
router.route("/").post(addBuyTransaction).get(getBuyTransactions);
router
  .route("/:id")
  .get(getBuyTransaction)
  .delete(deleteBuyTransaction)
  .patch(updateBuyTransaction);

router.route("/composed/:id").patch(updateComposed);
export default router;
