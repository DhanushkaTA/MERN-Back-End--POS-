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
exports.getOrderById = exports.getAllOrders = exports.deleteOrder = exports.updateOrder = exports.createOrder = void 0;
const custom_response_1 = require("../dtos/custom.response");
const order_model_1 = __importDefault(require("../models/order.model"));
const item_model_1 = __importDefault(require("../models/item.model"));
const mongodb_1 = require("mongodb");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let session = yield order_model_1.default.startSession();
        yield session.withTransaction(() => __awaiter(void 0, void 0, void 0, function* () {
            //-------------------- update items -----------------------------------------------------------------
            let orderDetails = req.body.orderDetails;
            for (let item of orderDetails) {
                console.log("item : " + item.itemId);
                let item_by_id = yield item_model_1.default.findOne({ _id: item.itemId });
                console.log("item_by_id : " + item_by_id);
                if (item_by_id) {
                    let update_qty = (item_by_id.qty - item.qty);
                    console.log(item_by_id.qty);
                    console.log(item.qty);
                    yield item_model_1.default.findByIdAndUpdate({ _id: item_by_id._id }, { $set: { qty: update_qty } }).session(session).exec();
                }
                else {
                    throw new Error(`Error : Something wrong with item`);
                }
            }
            //-------------------- update items -----------------------------------------------------------------
            let insertOne = yield order_model_1.default.create([{
                    date: req.body.date,
                    totalQty: req.body.totalQty,
                    totalAmount: req.body.totalAmount,
                    customerId: req.body.customerId,
                    orderDetails: req.body.orderDetails
                }], { session });
        }));
        yield session.endSession();
        res.status(200).send(new custom_response_1.CustomResponse(200, `Order saves successfully`));
    }
    catch (e) {
        console.log(e);
        res.status(500).send(new custom_response_1.CustomResponse(500, `wade kela una : ${e}`));
    }
});
exports.createOrder = createOrder;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
    }
});
exports.updateOrder = updateOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = req.query;
        let orderId = query.order;
        let order_by_id = yield order_model_1.default.findOne({ _id: orderId });
        if (order_by_id) {
            yield order_model_1.default.deleteOne({ _id: orderId }).then(success => {
                res.status(200).send(new custom_response_1.CustomResponse(200, "Order deleted successfully"));
            }).catch(error => {
                res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
            });
        }
        else {
            res.status(404).send(new custom_response_1.CustomResponse(404, `Order not found!!!`));
        }
    }
    catch (error) {
        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
    }
});
exports.deleteOrder = deleteOrder;
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = req.query;
        let size = query.size;
        let page = query.page;
        let documentCount = yield order_model_1.default.countDocuments();
        let totalPages = Math.ceil(documentCount / size);
        let order_list = yield order_model_1.default.find().limit(size).skip(size * (page - 1));
        res.status(200).send(new custom_response_1.CustomResponse(200, "Order found successfully", order_list, documentCount, totalPages));
    }
    catch (error) {
        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
    }
});
exports.getAllOrders = getAllOrders;
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = req.query;
        let size = query.size;
        let page = query.page;
        if (isValidObjectId(req.params.id)) {
            let documentsCount = yield order_model_1.default.countDocuments({ _id: req.params.id });
            let totalPages = Math.ceil(documentsCount / size);
            let order_list = yield order_model_1.default.find({ _id: req.params.id }).limit(size).skip(size * (page - 1));
            res.status(200).send(new custom_response_1.CustomResponse(200, "Orders found", order_list, documentsCount, totalPages));
        }
        else {
            res.status(200).send(new custom_response_1.CustomResponse(200, "Orders not found!", [], 0, 1));
        }
    }
    catch (error) {
        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
    }
});
exports.getOrderById = getOrderById;
function isValidObjectId(id) {
    return mongodb_1.ObjectId.isValid(id) && (String(new mongodb_1.ObjectId(id)) === id);
}
const isExitsOrder = (orderId, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield order_model_1.default.findOne({ _id: orderId }).then(success => {
            return success;
        }).catch(error => {
            res.status(500).send(new custom_response_1.CustomResponse(500, `Error can't find: ${error}`));
        });
    }
    catch (error) {
        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
    }
});
//# sourceMappingURL=order.controller.js.map