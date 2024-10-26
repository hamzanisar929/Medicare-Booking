import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { restrict } from "../middleware/protectRoute.js";
import {
  updateUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
} from "../controllers/userController.js";

const router = express.Router();

router.patch("/");

router.get("/", protectRoute, restrict(["admin"]), getAllUsers);
router.get("/:id", protectRoute, restrict(["patient"]), getSingleUser);
router.delete("/delete/:id", protectRoute, restrict(["patient"]), deleteUser);
router.patch("/update/:id", protectRoute, restrict(["patient"]), updateUser);

export default router;
