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
exports.updateLoginRecode = exports.getLoginRecodeById = exports.getAllLoginRecodesByUsername = exports.getAllLoginRecodes = exports.addLoginDetail = void 0;
const custom_response_1 = require("../dtos/custom.response");
const logInDetail_model_1 = __importDefault(require("../models/logInDetail.model"));
const addLoginDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query_string = req.query;
        let date_time = query_string.time;
        let logInDetailModel = new logInDetail_model_1.default({
            username: res.tokenData.user.username,
            role: res.tokenData.user.role,
            logInDate: date_time
            // logOutDate:"Not yet"
        });
        let recode = yield logInDetailModel.save();
        if (recode) {
            res.status(200).json(new custom_response_1.CustomResponse(200, "Recoded", recode));
        }
        else {
            res.status(500).send(new custom_response_1.CustomResponse(500, `Something went wrong`));
        }
    }
    catch (error) {
        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
    }
});
exports.addLoginDetail = addLoginDetail;
const getAllLoginRecodes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (res.tokenData.user.role === "admin") {
            let query_string = req.query;
            let size = query_string.size;
            let page = query_string.page;
            let documentsCount = yield logInDetail_model_1.default.countDocuments();
            let totalPages = Math.ceil(documentsCount / size);
            let recode_list = yield logInDetail_model_1.default.find().limit(size).skip(size * (page - 1));
            res.status(200).send(new custom_response_1.CustomResponse(200, "Login Details found", recode_list, documentsCount, totalPages));
        }
        else {
            res.status(401).send(new custom_response_1.CustomResponse(401, "Access Denied"));
        }
    }
    catch (error) {
        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
    }
});
exports.getAllLoginRecodes = getAllLoginRecodes;
const getAllLoginRecodesByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (res.tokenData.user.role === "admin") {
            let query_string = req.query;
            let size = query_string.size;
            let page = query_string.page;
            let documentsCount = yield logInDetail_model_1.default.countDocuments({ username: new RegExp(req.params.username, 'i') });
            let totalPages = Math.ceil(documentsCount / size);
            let recode_list = yield logInDetail_model_1.default.find({ username: new RegExp(req.params.username, 'i') })
                .limit(size).skip(size * (page - 1));
            res.status(200).send(new custom_response_1.CustomResponse(200, "Login Details found", recode_list, documentsCount, totalPages));
        }
        else {
            res.status(401).send(new custom_response_1.CustomResponse(401, "Access Denied"));
        }
    }
    catch (error) {
        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
    }
});
exports.getAllLoginRecodesByUsername = getAllLoginRecodesByUsername;
const getLoginRecodeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (res.tokenData.user.role === "admin") {
            let query_string = req.query;
            let id = query_string.id;
            let recode = yield logInDetail_model_1.default.findOne({ _id: id });
            if (recode) {
                res.status(200).send(new custom_response_1.CustomResponse(200, "Recode found", recode));
            }
            else {
                res.status(404).send(new custom_response_1.CustomResponse(404, "Recode not found"));
            }
        }
        else {
            res.status(401).send(new custom_response_1.CustomResponse(401, "Access Denied"));
        }
    }
    catch (error) {
        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
    }
});
exports.getLoginRecodeById = getLoginRecodeById;
const updateLoginRecode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body.id);
        let recode = yield logInDetail_model_1.default.findOne({ _id: req.body.id });
        console.log(recode);
        if (recode) {
            yield logInDetail_model_1.default.updateOne({ _id: req.body.id }, { $set: { logOutDate: req.body.logOutDate } })
                .then(success => {
                res.status(200).send(new custom_response_1.CustomResponse(200, "Recode update successfully"));
            }).catch(error => {
                res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
            });
        }
        else {
            res.status(404).send(new custom_response_1.CustomResponse(404, "Recode not found"));
        }
    }
    catch (error) {
        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
    }
});
exports.updateLoginRecode = updateLoginRecode;
//# sourceMappingURL=logInDetail.controller.js.map