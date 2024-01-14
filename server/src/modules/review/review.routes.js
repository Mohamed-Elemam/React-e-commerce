import { Router } from "express";
const router = Router();
import * as reviewController from "./review.controller.js";
import { errorHandling } from "../../../utils/errorHandling.js";
import { handleAuth } from '../auth/auth.controller.js';


router
    .post("/",handleAuth,errorHandling(reviewController.addReview))
    .delete("/:reviewId",handleAuth,errorHandling(reviewController.deleteReview))
    .put("/:reviewId",handleAuth,errorHandling(reviewController.updateReview))
    .get("/:reviewId",handleAuth,errorHandling(reviewController.getReviewById))
    .get("/",handleAuth,errorHandling(reviewController.getAllUserReviews))

export default router;
