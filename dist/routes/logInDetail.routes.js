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
const LogInDetailController = __importStar(require("../controllers/logInDetail.controller"));
const VerifyToken = __importStar(require("../middlewares/verifyToken"));
const VerifyRole = __importStar(require("../middlewares/roleVerify"));
const Roles_1 = require("../utils/Roles");
let router = express_1.default.Router();
router.post('/save', VerifyToken.verifyToken, VerifyRole.restrictTo(Roles_1.ADMIN, Roles_1.REC), LogInDetailController.addLoginDetail); //query string ?time=
router.get('/get/all', VerifyToken.verifyToken, VerifyRole.restrictTo(Roles_1.ADMIN), LogInDetailController.getAllLoginRecodes);
//query string ?size=10&page=1
router.get('/get/all/:username', VerifyToken.verifyToken, VerifyRole.restrictTo(Roles_1.ADMIN), LogInDetailController.getAllLoginRecodesByUsername);
//path variable and //query string ?size=10&page=1
router.get('/get/recode', VerifyToken.verifyToken, VerifyRole.restrictTo(Roles_1.ADMIN), LogInDetailController.getLoginRecodeById); //query string ?id=
router.put('/update', LogInDetailController.updateLoginRecode);
exports.default = router;
//# sourceMappingURL=logInDetail.routes.js.map