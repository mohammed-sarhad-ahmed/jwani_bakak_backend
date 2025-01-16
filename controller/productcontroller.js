import express from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../handler/producthandler";

const router = express.Router();

router.route("/").post(addProduct).get(getProducts);
router.route("/:id").get(getProduct).delete(deleteProduct).patch(updateProduct);

export default router;
