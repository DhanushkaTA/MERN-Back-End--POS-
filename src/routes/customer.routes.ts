import express from "express";
import * as VerifyToken from "../middlewares/verifyToken";
import * as CustomerController from "../controllers/customer.controller";
import * as VerifyRole from "../middlewares/roleVerify";
import {ADMIN, REC} from "../utils/Roles";

let router = express.Router();

router.post(
    '/save',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN,REC),
    CustomerController.addCustomer)

router.get(
    '/get/all',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN,REC),
    CustomerController.getAllCustomers)

router.get(
    '/get/customer/:nic',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN,REC),
    CustomerController.getCustomerByNic) //path variable

router.put(
    '/update',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN,REC),
    CustomerController.updateCustomer)

router.delete(
    '/delete',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN,REC),
    CustomerController.deleteCustomer) // query string -> ?nic=

export default router;