import express from "express";
import {
  addBuyTransaction,
  updateBuyTransaction,
  deleteBuyTransaction,
  getBuyTransaction,
} from "../handler/handlebuytransaction.js";

const router = express.Router();
router.route("/").post(addBuyTransaction).get(getBuyTransaction);
router
  .route("/:id")
  .get(getBuyTransaction)
  .delete(deleteBuyTransaction)
  .patch(updateBuyTransaction);
export default router;
