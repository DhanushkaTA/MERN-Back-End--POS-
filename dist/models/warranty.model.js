"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let warrantySchema = new mongoose_1.default.Schema({
    itemId: { type: String, required: true },
    orderId: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true, default: Date.now() },
    expireDate: { type: Date, required: true },
});
const WarrantyModel = mongoose_1.default.model('warranty', warrantySchema);
exports.default = WarrantyModel;
//# sourceMappingURL=warranty.model.js.map