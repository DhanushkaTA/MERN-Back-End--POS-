import express, {Router} from "express";
import * as DetailsController from "../controllers/details.controller"
import * as VerifyToken from "../middlewares/verifyToken"
import * as VerifyRole from "../middlewares/roleVerify";
import {ADMIN, REC} from "../utils/Roles";

let router = express.Router();

router.get(
    '/all',
    VerifyRole.restrictTo(ADMIN),
    DetailsController.getDetails)

export default router;