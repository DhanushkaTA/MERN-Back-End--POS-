import express, {Router} from "express";
import * as ItemController from "../controllers/item.controller"
import * as VerifyToken from "../middlewares/verifyToken"

let router = express.Router();

router.post('/save', VerifyToken.verifyToken, ItemController.saveItem)

router.get('/get/all', VerifyToken.verifyToken, ItemController.getAllItems)

router.get('/get', VerifyToken.verifyToken,  ItemController.getItemById) // query string -> ?code=

router.put('/update', VerifyToken.verifyToken,  ItemController.updateItem)

router.delete('/delete', VerifyToken.verifyToken,  ItemController.deleteItem)  // query string -> ?id=

export default router