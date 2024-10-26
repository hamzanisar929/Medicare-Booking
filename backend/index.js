import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import connectDB from "./config/db.js";
import { connect } from "http2";
import authRoute from "./routes/authroutes.js";
import userRoute from "./routes/userroutes.js";
import doctorRoute from "./routes/doctorroutes.js";
import reviewRoute from "./routes/reviewroutes.js";

const app = express();

dotenv.config();

const port = process.env.PORT || 3000;

const corsOptions = {
  origin: true,
};

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/doctor", doctorRoute);
app.use("/api/v1/review", reviewRoute);

app.listen(port, () => {
  console.log(`server listening on ${port}`);
  connectDB();
});
