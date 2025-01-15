import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
const app = express();

dotenv.config();
mongoose.connect();

app.use(cors());
app.use(express.json());

const databasePort = process.env.DATABASEPORT;
const databaseAddress = process.env.DATABASEADDRESS;

await mongoose.connect(
  `mongodb://${databaseAddress}:${databasePort}/jwani_balak`
);

app.listen(8080, () => {
  console.log("server has started at port 8080");
});
