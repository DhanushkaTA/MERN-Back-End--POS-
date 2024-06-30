"use strict";
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
exports.getWarrantyByOrderId = exports.getAllWarranty = exports.addWarranty = void 0;
const custom_response_1 = require("../dtos/custom.response");
const warranty_model_1 = __importDefault(require("../models/warranty.model"));
const addWarranty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let warrantyModel = new warranty_model_1.default({
            itemId: req.body.itemId,
            orderId: req.body.orderId,
            description: req.body.description,
            startDate: req.body.startDate,
            expireDate: req.body.expireDate
        });
        let warranty = yield warrantyModel.save();
        if (warranty) {
            res.status(200).send(new custom_response_1.CustomResponse(200, "Warranty saved successfully", warranty));
        }
        else {
            res.status(200).send(new custom_response_1.CustomResponse(500, "Something went wrong"));
        }
    }
    catch (error) {
        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
    }
});
exports.addWarranty = addWarranty;
const getAllWarranty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query_string = req.query;
        let size = query_string.size;
        let page = query_string.page;
        let countDocuments = yield warranty_model_1.default.countDocuments();
        let totalPages = Math.ceil(countDocuments / size);
        let warrantyList = yield warranty_model_1.default.find().limit(size).skip(size * (page - 1));
        res.status(200).send(new custom_response_1.CustomResponse(200, "Warranty found.", warrantyList, totalPages));
    }
    catch (error) {
        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
    }
});
exports.getAllWarranty = getAllWarranty;
const getWarrantyByOrderId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = req.query;
        let orderId = query.orderId;
        let warranty = yield warranty_model_1.default.findOne({ orderId: orderId });
        if (warranty) {
            res.status(200).send(new custom_response_1.CustomResponse(200, "Warranty found.", warranty));
        }
        else {
            res.status(404).send(new custom_response_1.CustomResponse(404, "Warranty not found!"));
        }
    }
    catch (error) {
        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
    }
});
exports.getWarrantyByOrderId = getWarrantyByOrderId;
//# sourceMappingURL=warranty.controller.js.map