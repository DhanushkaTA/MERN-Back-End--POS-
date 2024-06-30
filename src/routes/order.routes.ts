import express from "express";
import * as VerifyToken from '../middlewares/verifyToken'
import * as OrderController from '../controllers/order.controller'
import * as VerifyRole from "../middlewares/roleVerify";
import {ADMIN, REC} from "../utils/Roles";

let router = express.Router();

router.post(
    '/save',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN,REC),
    OrderController.createOrder)

router.put(
    '/update',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN,REC),
    OrderController.updateOrder
)

router.get(
    '/get/all',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN,REC),
    OrderController.getAllOrders
)//query string?size=page=

router.get(
    '/get/order/:id',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN,REC),
    OrderController.getOrderById
)//query string ?order=

router.delete(
    '/delete',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN,REC),
    OrderController.deleteOrder
)//query string ?order

export default router;