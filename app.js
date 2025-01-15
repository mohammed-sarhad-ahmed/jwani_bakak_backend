import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

const databasePort = process.env.DATABASEPORT;
const databaseAddress = process.env.DATABASEADDRESS;
console.log(databaseAddress, databasePort);
await mongoose.connect(`mongodb://localhost:27017/pricive`);

app.listen(8080, () => {
  console.log("server has started at port 8080");
});
