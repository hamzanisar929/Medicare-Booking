import Review from "../models/ReviewSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();

    res.status(200).json({ status: "success", data: reviews });
  } catch (error) {
    console.log("Error in get all Review controller", err.message);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
};

export const createReview = async (req, res) => {
  if (!req.body.doctor) req.body.doctor = req.params.doctorId;
  if (!req.body.user) req.body.user = req.userId;

  const newReview = new Review(req.body);
  try {
    const savedReview = await newReview.save();
    await Doctor.findByIdAndUpdate(req.body.doctor, {
      $push: { reviews: savedReview._id },
    });

    res.status(201).json({ status: "success", message: "Review created!" });
  } catch (error) {
    console.log("Error in create Review controller", err.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
