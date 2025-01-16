import mongoose from "mongoose";
import ProductModel from "../model/product";

export async function addProduct(req, res) {
  try {
    const product = await ProductModel.create(req.body);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}
