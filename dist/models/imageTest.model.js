"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let imageSchema = new mongoose_1.default.Schema({
    image: { type: String, required: true }
});
let ImageModel = mongoose_1.default.model('image', imageSchema);
exports.default = ImageModel;
//# sourceMappingURL=imageTest.model.js.map