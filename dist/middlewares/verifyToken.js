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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const custom_response_1 = require("../dtos/custom.response");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const process = __importStar(require("process"));
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let authorizationToken = req.headers.authorization;
    if (!authorizationToken) {
        return res.status(401).json(new custom_response_1.CustomResponse(404, "Token not found!"));
    }
    try {
        // let token_data = jwt.verify(authorizationToken, process.env.SECRET as Secret);
        // res.tokenData = token_data;
        res.tokenData = jsonwebtoken_1.default.verify(authorizationToken, process.env.SECRET);
        next();
    }
    catch (error) {
        return res.status(401).json(new custom_response_1.CustomResponse(401, "Invalid Token"));
    }
});
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifyToken.js.map