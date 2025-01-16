import express from "express";
import { addProduct } from "../handler/producthandler";

const router = express.Router();

router.route("/").post(addProduct);

export default router;
