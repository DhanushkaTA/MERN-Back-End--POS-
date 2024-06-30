import express, {Router} from "express";
import * as ItemController from "../controllers/item.controller"
import * as VerifyToken from "../middlewares/verifyToken"
import {upload, uploadPic} from "../middlewares/imageUplode";
import * as VerifyRole from "../middlewares/roleVerify";
import {ADMIN, REC} from "../utils/Roles";

let router = express.Router();

router.post(
    '/save',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN),
    uploadPic.single('file')
    , ItemController.saveItem)

router.get(
    '/get/all',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN,REC),
    ItemController.getAllItems)

router.get(
    '/get',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN,REC),
    ItemController.getItemById) // query string -> ?code=

router.get(
    '/get/search',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN,REC),
    ItemController.getItemByName) // query string -> ?name=

router.put(
    '/update',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN),
    uploadPic.single('file'),
    ItemController.updateItem)

router.delete(
    '/delete',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN),
    ItemController.deleteItem)  // query string -> ?id=

export default router