import express, {Router} from "express";
import * as UserController from "../controllers/user.controller"

let router = express.Router();

// Create user
router.post('/save', UserController.createUser)

router.put('/update', UserController.updateUser)

router.get('/get/all', UserController.getAllUser)

router.delete('/delete', UserController.deleteUser)

router.post('/auth', UserController.authUser)

export default router;