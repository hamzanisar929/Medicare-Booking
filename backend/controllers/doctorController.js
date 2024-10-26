import Doctor from "../models/DoctorSchema.js";

export const updateDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    await updatedDoctor.save();

    return res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: updatedDoctor,
    });
  } catch (error) {
    console.log("error in Update Doctor controller", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const deleteDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(id);

    return res.status(200).json({
      status: "success",
      message: "User deleted successfully",
      data: deletedDoctor,
    });
  } catch (error) {
    console.log("error in deleteDoctorcontroller", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;

    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select(
        "-password"
      );
    }

    return res.status(200).json({
      status: "success",
      message: "doctors found successfully",
      data: doctors,
    });
  } catch (error) {
    console.log("error in get all doctors controller", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const getSingleDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await Doctor.findById(id)
      .populate({ path: "reviews" })
      .select("-password");

    return res.status(200).json({
      status: "success",
      message: "Doctor found successfully",
      data: doctor,
    });
  } catch (error) {
    console.log("error in get single doctor controller", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
