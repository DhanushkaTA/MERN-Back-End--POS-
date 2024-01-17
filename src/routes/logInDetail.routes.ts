import express from "express";
import * as LogInDetailController from "../controllers/logInDetail.controller"
import * as VerifyToken from "../middlewares/verifyToken"

let router = express.Router();

router.post('/save', VerifyToken.verifyToken, LogInDetailController.addLoginDetail);

router.get('/get/all', VerifyToken.verifyToken, LogInDetailController.getAllLoginRecodes);

router.get('/get/all/:username', VerifyToken.verifyToken, LogInDetailController.getAllLoginRecodesByUsername);
//path variable

router.get('/get/recode', VerifyToken.verifyToken, LogInDetailController.getLoginRecodeById)//query string ?id=

router.put('/update', VerifyToken.verifyToken, LogInDetailController.updateLoginRecode)
export default router;