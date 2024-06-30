import express, {Router} from "express";
import * as UserController from "../controllers/user.controller"
import * as VerifyToken from "../middlewares/verifyToken"
import {upload, uploadPic} from "../middlewares/imageUplode";
import * as VerifyRole from "../middlewares/roleVerify";
import {ADMIN} from "../utils/Roles";

let router = express.Router();

// Create user
router.post(
    '/save',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN),
    uploadPic.single('file'),
    UserController.createUser
)

router.put(
    '/update',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN),
    uploadPic.single('file'),
    UserController.updateUser
)

router.get(
    '/get/all',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN),
    UserController.getAllUser
)

router.delete(
    '/delete',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN),
    UserController.deleteUser
)

router.post(
    '/auth',
    UserController.authUser
)

// router.post('/image', VerifyToken.verifyToken,  upload.single('file'), UserController.handleImage)
router.post(
    '/image',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN),
    uploadPic.single('file'),
    UserController.handleImage
)

export default router;