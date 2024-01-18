import express, {Router} from "express";
import * as UserController from "../controllers/user.controller"
import * as VerifyToken from "../middlewares/verifyToken"
import * as ValidateImage from "../middlewares/validateImages"
import {upload, uploadPic} from "../middlewares/imageUplode";

let router = express.Router();

// Create user
router.post('/save', UserController.createUser)

router.put('/update', VerifyToken.verifyToken, UserController.updateUser)

router.get('/get/all', VerifyToken.verifyToken, UserController.getAllUser)

router.delete('/delete', VerifyToken.verifyToken, UserController.deleteUser)

router.post('/auth', UserController.authUser)

// router.post('/image', VerifyToken.verifyToken, ValidateImage.validateImages, upload.single('file'), UserController.handleImage)
router.post('/image', VerifyToken.verifyToken, ValidateImage.validateImages, uploadPic.single('file'), UserController.handleImage)

export default router;