import express from "express";
import * as VerifyToken from "../middlewares/verifyToken";
import * as WarrantyController from "../controllers/warranty.controller";
import * as VerifyRole from "../middlewares/roleVerify";
import {ADMIN, REC} from "../utils/Roles";


let router = express.Router();

router.post(
    '/save',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN,REC),
    WarrantyController.addWarranty)
;

router.get(
    '/get/all',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN,REC),
    WarrantyController.getAllWarranty
);

router.get(
    '/get/warranty',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN,REC),
    WarrantyController.getWarrantyByOrderId
) //query string -> ?orderId=


export default router;