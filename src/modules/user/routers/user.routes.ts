import { Router } from "express";
import { authenticate, authorize } from "../../../auth/auth.middleware";
import { getAllUsers, getRecommendation, getUser } from "../controller/user.controller";
import { validate } from "../../../middlwares/validate";
import { getRecommendationsSchema, getUserSchema } from "../validations/user.validate";
const userRouter=Router()

userRouter.route('/users').get(authenticate,authorize('admin'),getAllUsers)
userRouter.route('/user').get(authenticate,authorize('admin'),validate(getUserSchema),getUser)
userRouter.route('/Recommendation').get(getRecommendation)

export default userRouter