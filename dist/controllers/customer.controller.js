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
exports.deleteCustomer = exports.updateCustomer = exports.getCustomerByNic = exports.getAllCustomers = exports.addCustomer = void 0;
const custom_response_1 = require("../dtos/custom.response");
const customer_model_1 = __importDefault(require("../models/customer.model"));
const addCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let customer_by_nic = yield customer_model_1.default.findOne({ nic: req.body.nic });
        if (customer_by_nic) {
            res.status(409).send(new custom_response_1.CustomResponse(409, "Nic already used!"));
        }
        else {
            let customerModel = new customer_model_1.default({
                nic: req.body.nic,
                fullName: req.body.fullName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber
            });
            yield customerModel.save().then(success => {
                res.status(200).send(new custom_response_1.CustomResponse(200, "Customer saved successfully.", success));
            }).catch(error => {
                res.status(500).send(new custom_response_1.CustomResponse(500, `Something went wrong! : ${error}`));
            });
        }
    }
    catch (error) {
        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
    }
});
exports.addCustomer = addCustomer;
const getAllCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query_string = req.query;
        let size = query_string.size;
        let page = query_string.page;
        let documentCount = yield customer_model_1.default.countDocuments();
        let totalPages = Math.ceil(documentCount / size);
        let customer_list = yield customer_model_1.default.find().limit(size).skip(size * (page - 1));
        res.status(200).send(new custom_response_1.CustomResponse(200, "Item found successfully.", customer_list, totalPages));
    }
    catch (error) {
        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
    }
});
exports.getAllCustomers = getAllCustomers;
const getCustomerByNic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let customer = yield customer_model_1.default.findOne({ nic: req.params.nic });
        if (customer) {
            res.status(200).send(new custom_response_1.CustomResponse(200, "Customer fount successfully", customer));
        }
        else {
            res.status(404).send(new custom_response_1.CustomResponse(404, "Customer not fount!!!"));
        }
    }
    catch (error) {
        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
    }
});
exports.getCustomerByNic = getCustomerByNic;
const updateCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let customer = yield customer_model_1.default.findOne({ _id: req.body.id });
        if (customer) {
            yield customer_model_1.default.findByIdAndUpdate({ _id: req.body.id }, {
                nic: req.body.nic,
                fullName: req.body.fullName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
            }).then(success => {
                res.status(200).send(new custom_response_1.CustomResponse(200, "Customer update successfully"));
            }).catch(error => {
                res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
            });
        }
        else {
            res.status(404).send(new custom_response_1.CustomResponse(404, "Customer not fount!!!"));
        }
    }
    catch (error) {
        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
    }
});
exports.updateCustomer = updateCustomer;
const deleteCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query_string = req.query;
        let nic = query_string.nic;
        let customer = yield customer_model_1.default.findOne({ nic: nic });
        if (customer) {
            yield customer_model_1.default.deleteOne({ nic: nic }).then(success => {
                res.status(200).send(new custom_response_1.CustomResponse(200, "Customer delete successfully"));
            }).catch(error => {
                res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
            });
        }
        else {
            res.status(404).send(new custom_response_1.CustomResponse(404, "Customer not fount!!!"));
        }
    }
    catch (error) {
        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
    }
});
exports.deleteCustomer = deleteCustomer;
//# sourceMappingURL=customer.controller.js.map