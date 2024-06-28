import { Router } from "express";
import { authenticate, authorize } from "../../../auth/auth.middleware";
import { loanBook } from "../controller/loan.controller";
import { loanBookSchema } from "../validations/loan.validations";
import { validate } from "../../../middlwares/validate";
const loanRouter=Router()
loanRouter.route('').post(authenticate,authorize('admin'),validate(loanBookSchema),loanBook)

export default loanRouter