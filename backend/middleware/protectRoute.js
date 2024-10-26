import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jsonwebtoken from "jsonwebtoken";
import { decode } from "punycode";
import { promisify } from "util";
import { waitForDebugger } from "inspector";

export const protectRoute = async (req, res, next) => {
  try {
    let token;
    let user = null;
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return res.status(400).json({ message: "You are not logged in" });
    }

    const decoded = await promisify(jsonwebtoken.verify)(
      token,
      process.env.SECRET_KEY
    );
    if (!decoded) {
      return res.status(404).json({ message: "Invalid token!" });
    }

    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (error) {
    console.log("Error in potect route middleware", err.message);
    res.status(404).json({});
  }
};

export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;
  let user = null;

  const patient = await User.findById(userId);
  const doctor = await Doctor.findById(userId);

  if (patient) {
    user = patient;
  }
  if (doctor) {
    user = doctor;
  }
  if (!user) {
    return res.status(404).json({ message: "No user found!" });
  }

  if (!roles.includes(user.role)) {
    return res
      .status(401)
      .json({ success: false, message: "You are not authorized" });
  }
  next();
};
