"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let logInDetailSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    role: { type: String, required: true },
    logInDate: { type: Date, required: true },
    logOutDate: { type: Date, required: false }
});
let LogInDetailModel = mongoose_1.default.model('logInDetail', logInDetailSchema);
exports.default = LogInDetailModel;
//# sourceMappingURL=logInDetail.model.js.map