import express from "express";
import { connect } from "http2";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Mongo DB successfully!");
  } catch (error) {
    console.log("Failed to connect to Mongo DB", error.message);
  }
};

export default connectDB;
