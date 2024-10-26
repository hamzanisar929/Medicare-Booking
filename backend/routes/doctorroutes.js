import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { restrict } from "../middleware/protectRoute.js";
import {
  updateDoctor,
  deleteDoctor,
  getAllDoctors,
  getSingleDoctor,
} from "../controllers/doctorController.js";

import reviewRoute from "../routes/reviewroutes.js";

const router = express.Router();

router.patch("/");

router.use("/:doctorId/review", reviewRoute);

router.get("/", protectRoute, restrict(["admin"]), getAllDoctors);
router.get("/:id", protectRoute, restrict(["doctor"]), getSingleDoctor);
router.delete("/delete/:id", protectRoute, restrict(["doctor"]), deleteDoctor);
router.patch("/update/:id", protectRoute, restrict(["doctor"]), updateDoctor);

export default router;
