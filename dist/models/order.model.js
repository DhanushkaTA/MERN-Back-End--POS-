"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let orderDetailSchema = new mongoose_1.default.Schema({
    itemId: { type: String, required: true },
    qty: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    amount: { type: Number, required: true },
    pic: { type: String, required: false }
});
let orderSchema = new mongoose_1.default.Schema({
    date: { type: Date, required: true },
    totalQty: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    customerId: { type: String, required: true },
    orderDetails: { type: [orderDetailSchema] }
});
let OrderModel = mongoose_1.default.model('order', orderSchema);
exports.default = OrderModel;
//# sourceMappingURL=order.model.js.map