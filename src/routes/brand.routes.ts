import express from "express";
import * as VerifyToken from "../middlewares/verifyToken";
import * as BrandController from "../controllers/brand.controller"
import {upload, uploadPic} from "../middlewares/imageUplode";
import * as VerifyRole from "../middlewares/roleVerify";
import {ADMIN, REC} from "../utils/Roles";

let router = express.Router();

router.post(
    '/save',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN),
    uploadPic.single('file'),
    BrandController.createBrand)

router.put(
    '/update',
    VerifyToken.verifyToken ,
    VerifyRole.restrictTo(ADMIN),
    uploadPic.single('file'),
    BrandController.updateBrand)

router.get(
    '/get/all/category/:category',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN,REC),
    BrandController.getAllBrandsByCategory)

router.get(
    '/get/all',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN,REC),
    BrandController.getAllBrands) // query string -> ?size=,page=,category=

router.get(
    '/get/brand/:brand',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN,REC),
    BrandController.getBrand)

router.delete(
    '/delete/:brand',
    VerifyToken.verifyToken,
    VerifyRole.restrictTo(ADMIN),
    BrandController.deleteBrand)

export default router;