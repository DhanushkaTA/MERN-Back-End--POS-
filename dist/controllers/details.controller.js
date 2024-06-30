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
exports.getDetails = void 0;
const custom_response_1 = require("../dtos/custom.response");
const item_model_1 = __importDefault(require("../models/item.model"));
const order_model_1 = __importDefault(require("../models/order.model"));
const getDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemCount = yield item_model_1.default.countDocuments();
        const emptyItemCount = yield item_model_1.default.countDocuments({ qty: 0 });
        const orderCount = yield order_model_1.default.countDocuments();
        const result_1 = yield order_model_1.default.aggregate([
            {
                $group: {
                    _id: null,
                    totalAmountSum: { $sum: "$totalAmount" }
                }
            }
        ]);
        const totalIncome = result_1.length > 0 ? result_1[0].totalAmountSum : 0;
        // Get today's date at midnight
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        // Get the end of today
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        console.log(startOfDay);
        console.log(endOfDay);
        // Perform the aggregation to sum the totalAmount for today
        const result = yield order_model_1.default.aggregate([
            {
                $match: {
                    date: {
                        $gte: startOfDay,
                        $lt: endOfDay
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmountSum: { $sum: "$totalAmount" }
                }
            }
        ]);
        const todayTotalAmount = result.length > 0 ? result[0].totalAmountSum : 0;
        let data = {
            "itemCount": itemCount,
            "emptyItemCount": emptyItemCount,
            "orderCount": orderCount,
            "totalIncome": totalIncome,
            "todayTotalAmount": todayTotalAmount
        };
        console.log(data);
        res.status(200).send(new custom_response_1.CustomResponse(200, `Get details`, data));
    }
    catch (error) {
        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
    }
});
exports.getDetails = getDetails;
//# sourceMappingURL=details.controller.js.map