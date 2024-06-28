import { Router } from "express";
import { signin, signup } from "./auth.controller";
import { validate } from "../middlwares/validate";
import { signinSchema, signupSchema } from "./auth.validate";
import { assertUniqueEmail } from "./auth.middleware";

const authRouter=Router()

authRouter.post('/signup',validate(signupSchema),assertUniqueEmail,signup)
authRouter.post('/signin',validate(signinSchema),signin)
export default authRouter