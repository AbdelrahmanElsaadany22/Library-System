import { Router } from "express"
import { authenticate, authorize } from "../../../auth/auth.middleware"
import { addReview, deleteReview, getReviews } from "../controller/review.controller"
import { validate } from "../../../middlwares/validate"
import { AddReviewSchema, deleteReviewsSchema, getReviewsSchema } from "../validations/review.validations"

const ReviewRouter=Router()


ReviewRouter.route('/')
.post(authenticate,authorize('admin','user'),validate(AddReviewSchema),addReview)
.get(authenticate,authorize('admin','user'),validate(getReviewsSchema),getReviews)
.delete(authenticate,authorize('admin','user'),validate(deleteReviewsSchema),deleteReview)
export default ReviewRouter