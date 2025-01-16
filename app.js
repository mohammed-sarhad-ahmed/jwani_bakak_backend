import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import companyRouter from "./controller/companycontroller.js";
import productRouter from "./controller/productcontroller.js";
import kleshRouter from "./controller/kleshcontroller.js";
import invoiceRouter from "./controller/invoicecontroller.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/company", companyRouter);
app.use("/product", productRouter);
app.use("/klesh", kleshRouter);
app.use("/invoice", invoiceRouter);
app.all("*", (req, res) => {
  res.status(404).json({
    message: `failed to find the route ${req.originalUrl}`,
  });
});
const databasePort = process.env.DATABASEPORT;
const databaseAddress = process.env.DATABASEADDRESS;
console.log(databaseAddress, databasePort);
await mongoose.connect(`mongodb://localhost:27017/jwani_balak`);

app.listen(8080, () => {
  console.log("server has started at port 8080");
});
