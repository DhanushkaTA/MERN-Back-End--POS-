"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let customerSchema = new mongoose_1.default.Schema({
    nic: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
});
let CustomerModel = mongoose_1.default.model('customer', customerSchema);
exports.default = CustomerModel;
//# sourceMappingURL=customer.model.js.map