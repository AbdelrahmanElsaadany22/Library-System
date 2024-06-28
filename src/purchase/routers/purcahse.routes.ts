import { Router } from "express";
import { authenticate, authorize } from "../../auth/auth.middleware";
import { addPurchase } from "../controller/purchase.controller";
import { validate } from "../../middlwares/validate";
import { addPurchaseSchema } from "../validations/purchase.validate";

const PurchaseRouter=Router()

PurchaseRouter.route('/')
.post(authenticate,authorize('admin','user'),validate(addPurchaseSchema),addPurchase)

export default PurchaseRouter

