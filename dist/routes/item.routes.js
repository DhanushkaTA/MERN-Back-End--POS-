"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ItemController = __importStar(require("../controllers/item.controller"));
const VerifyToken = __importStar(require("../middlewares/verifyToken"));
const imageUplode_1 = require("../middlewares/imageUplode");
const VerifyRole = __importStar(require("../middlewares/roleVerify"));
const Roles_1 = require("../utils/Roles");
let router = express_1.default.Router();
router.post('/save', VerifyToken.verifyToken, VerifyRole.restrictTo(Roles_1.ADMIN), imageUplode_1.uploadPic.single('file'), ItemController.saveItem);
router.get('/get/all', VerifyToken.verifyToken, VerifyRole.restrictTo(Roles_1.ADMIN, Roles_1.REC), ItemController.getAllItems);
router.get('/get', VerifyToken.verifyToken, VerifyRole.restrictTo(Roles_1.ADMIN, Roles_1.REC), ItemController.getItemById); // query string -> ?code=
router.get('/get/search', VerifyToken.verifyToken, VerifyRole.restrictTo(Roles_1.ADMIN, Roles_1.REC), ItemController.getItemByName); // query string -> ?name=
router.put('/update', VerifyToken.verifyToken, VerifyRole.restrictTo(Roles_1.ADMIN), imageUplode_1.uploadPic.single('file'), ItemController.updateItem);
router.delete('/delete', VerifyToken.verifyToken, VerifyRole.restrictTo(Roles_1.ADMIN), ItemController.deleteItem); // query string -> ?id=
exports.default = router;
//# sourceMappingURL=item.routes.js.map