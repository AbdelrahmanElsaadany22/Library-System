import { Router } from "express";
import authRouter from "../auth/auth.routes";
import userRouter from "../modules/user/routers/user.routes";
import BookRouter from "../modules/book/routers/book.routes";
import ReviewRouter from "../modules/review/routers/review.routes";
import loanRouter from "../modules/loan/routers/loan.routes";
import PurchaseRouter from "../purchase/routers/purcahse.routes";

const router=Router()

router.use('/Auth',authRouter)
router.use('/User',userRouter)
router.use('/Book',BookRouter)
router.use('/Review',ReviewRouter)
router.use('/Loan',loanRouter)
router.use('/Purchase',PurchaseRouter)
export default router


