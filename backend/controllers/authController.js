import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../config/generateTokenAndSetCookie.js";

export const register = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;

  try {
    let user = null;

    if (role === "patient") {
      user = await User.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    }

    if (user) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hashedPassword,
        photo,
        gender,
        role,
      });
    }

    if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashedPassword,
        photo,
        gender,
        role,
      });
    }

    if (user) {
      generateTokenAndSetCookie(user._id, res);
      await user.save();
      res
        .status(201)
        .json({ success: true, message: "user created successfully" });
    }
  } catch (error) {
    console.log("error in register controller", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = null;

    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });

    if (patient) {
      user = patient;
    }
    if (doctor) {
      user = doctor;
    }

    if (!user) {
      return res.status(404).json({ message: "No user found!" });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({ user });
  } catch (error) {
    console.log("error in logIn controller", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log("error in logOut controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// import { generateTokenAndSetCookie } from "../libs/utils/generateTokenAndSetCookie.js";

// export const register = async (req, res) => {
//   try {
//     const { email, password, username } = req.body;

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return res.status(400).json({ message: "Invalid email format" });
//     }
//     if (password.length < 6) {
//       return res
//         .status(400)
//         .json({ message: "Password must be at least 6 characters long!" });
//     }

//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ message: "Username already taken" });
//     }

//     const existingEmail = await User.findOne({ email });
//     if (existingEmail) {
//       return res.status(400).json({ message: "Email already taken" });
//     }

//     const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
//     const Image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

//     //crypting pwd
//     const salt = await bcryptjs.genSalt(10);
//     const hashedPassword = await bcryptjs.hash(password, salt);

//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//       Image,
//     });
//     if (newUser) {
//       generateTokenAndSetCookie(newUser._id, res);
//       await newUser.save();

//       res.status(200).json({
//         _id: newUser._id,
//         username: newUser.username,
//         email: newUser.email,
//         Image: newUser.Image,
//       });
//     } else {
//       return res.status(400).json({ message: "Failed to create new user" });
//     }
//   } catch (error) {
//     console.log("error in register controller", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     const isPasswordCorrect = await bcryptjs.compare(
//       password,
//       user?.password || ""
//     );
//     if (!user || !isPasswordCorrect) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     generateTokenAndSetCookie(user._id, res);

//     res.status(200).json({ user });
//   } catch (error) {
//     console.log("error in login controller", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const logout = async (req, res) => {
//   try {
//     res.clearCookie("jwt");
//     res.status(200).json({ message: "User logged out successfully" });
//   } catch (error) {
//     console.log("error in logout controller", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const getMe = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select("-password");
//     res.status(200).json({ user });
//   } catch (error) {
//     console.log("error in getMe controller", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
