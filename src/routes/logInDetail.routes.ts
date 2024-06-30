import express from "express";
import * as LogInDetailController from "../controllers/logInDetail.controller"
import * as VerifyToken from "../middlewares/verifyToken"
import * as VerifyRole from "../middlewares/roleVerify";
import {ADMIN, REC} from "../utils/Roles";

let router = express.Router();

router.post(
    '/save',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN,REC),
    LogInDetailController.addLoginDetail);//query string ?time=

router.get(
    '/get/all',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN),
    LogInDetailController.getAllLoginRecodes);
//query string ?size=10&page=1

router.get('/get/all/:username',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN),
    LogInDetailController.getAllLoginRecodesByUsername);
//path variable and //query string ?size=10&page=1

router.get(
    '/get/recode',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN),
    LogInDetailController.getLoginRecodeById)//query string ?id=

router.put(
    '/update',
    LogInDetailController.updateLoginRecode)
export default router;