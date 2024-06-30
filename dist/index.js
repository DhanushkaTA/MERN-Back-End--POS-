"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose = __importStar(require("mongoose"));
const process = __importStar(require("process"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const item_routes_1 = __importDefault(require("./routes/item.routes"));
const warranty_routes_1 = __importDefault(require("./routes/warranty.routes"));
const customer_routes_1 = __importDefault(require("./routes/customer.routes"));
const logInDetail_routes_1 = __importDefault(require("./routes/logInDetail.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const brand_routes_1 = __importDefault(require("./routes/brand.routes"));
const details_routes_1 = __importDefault(require("./routes/details.routes"));
let app = (0, express_1.default)();
app.use(express_1.default.static('src/media'));
app.use((0, cors_1.default)({
    origin: "*",
    methods: "*"
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGO_URL).then(r => {
    exports.db = r;
    console.log("DB Connected Successfully");
}).catch(error => {
    console.log(`DB Connection Error : ${error}`);
});
//------------------------------------------
app.use('/user', user_routes_1.default);
app.use('/item', item_routes_1.default);
app.use('/warranty', warranty_routes_1.default);
app.use('/customer', customer_routes_1.default);
app.use('/login', logInDetail_routes_1.default);
app.use('/order', order_routes_1.default);
app.use('/brand', brand_routes_1.default);
app.use('/details', details_routes_1.default);
//------------------------------------------
app.listen(9000, () => {
    console.log("Server start on port 9000");
});
//# sourceMappingURL=index.js.map