import express from "express";
import { protectRoute, restrict } from "../middleware/protectRoute.js";
import {
  getAllReviews,
  createReview,
} from "../controllers/reviewController.js";

const router = express.Router({ mergeParams: true });

router.use(protectRoute);
router.get("/", getAllReviews);
router.post("/", restrict(["patient"]), createReview);

export default router;
