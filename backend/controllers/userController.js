import User from "../models/UserSchema.js";

export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    await updatedUser.save();

    return res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log("error in Update controller", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);

    return res.status(200).json({
      status: "success",
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    console.log("error in deleteUser controller", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    return res.status(200).json({
      status: "success",
      message: "Users found successfully",
      data: users,
    });
  } catch (error) {
    console.log("error in get all users controller", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password");

    return res.status(200).json({
      status: "success",
      message: "User found successfully",
      data: user,
    });
  } catch (error) {
    console.log("error in get signle user controller", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
