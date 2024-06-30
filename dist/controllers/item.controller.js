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
exports.deleteItem = exports.updateItem = exports.getAllItems = exports.getItemByName = exports.getItemById = exports.saveItem = void 0;
const custom_response_1 = require("../dtos/custom.response");
const item_model_1 = __importDefault(require("../models/item.model"));
const fs_1 = __importDefault(require("fs"));
const saveItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.fileError) {
            //delete image
            fs_1.default.unlinkSync(req.file.path);
            res.status(401).send(new custom_response_1.CustomResponse(401, "Image format not allow"));
        }
        else {
            let user = res.tokenData.user;
            let fileName = req.file.filename;
            let item_data = JSON.parse(req.body.item);
            if (user.role === 'Admin') {
                let item_by_code = yield item_model_1.default.findOne({ code: item_data.code });
                if (item_by_code) {
                    //delete image
                    fs_1.default.unlinkSync(req.file.path);
                    res.status(409).send(new custom_response_1.CustomResponse(409, "Code already used!"));
                }
                else {
                    let itemModel = new item_model_1.default({
                        code: item_data.code,
                        name: item_data.name,
                        description: item_data.description,
                        category: item_data.category,
                        brand: item_data.brand,
                        regularPrice: item_data.regularPrice,
                        salePrice: item_data.salePrice,
                        qty: item_data.qty,
                        warranty: item_data.warranty,
                        stockStatus: item_data.stockStatus,
                        itemPic: `items/${fileName}`
                    });
                    yield itemModel.save().then(success => {
                        res.status(200).send(new custom_response_1.CustomResponse(200, "Item saved successfully.", success));
                    }).catch(error => {
                        //delete image
                        fs_1.default.unlinkSync(req.file.path);
                        res.status(500).send(new custom_response_1.CustomResponse(500, `Something went wrong! : ${error}`));
                    });
                }
            }
            else {
                //delete image
                fs_1.default.unlinkSync(req.file.path);
                res.status(401).send(new custom_response_1.CustomResponse(401, "Access Denied"));
            }
        }
    }
    catch (error) {
        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
    }
});
exports.saveItem = saveItem;
const getItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query_string = req.query;
        let code = query_string.code;
        let item_by_code = yield item_model_1.default.findOne({ code: code });
        const content = 'Some content!';
        // fs.readFile(`src/media/images/${item_by_code?.itemPic}`, 'utf8', (err, data) => {
        //     if (err) {
        //         console.error('Error reading file:', err);
        //     } else {
        //         // Process the file content (data variable)
        //         console.log('File content:', data);
        //     }
        // });
        if (item_by_code) {
            res.status(200).send(new custom_response_1.CustomResponse(200, "Item found successfully.", item_by_code));
        }
        else {
            res.status(404).send(new custom_response_1.CustomResponse(404, "Item not found!!!"));
        }
    }
    catch (error) {
        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
    }
});
exports.getItemById = getItemById;
const getItemByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("awa");
    try {
        let query_string = req.query;
        let name = query_string.name;
        console.log(name);
        let item_by_name = yield item_model_1.default.find({ name: new RegExp(name, 'i') });
        // let item_by_name :ItemInterface[] | null = await ItemModel.find({name:{ $regex: name }});
        // let item_by_count = await ItemModel.find({name: name}).countDocuments();
        if (item_by_name) {
            res.status(200).send(new custom_response_1.CustomResponse(200, "Item found successfully.", item_by_name));
        }
        else {
            res.status(404).send(new custom_response_1.CustomResponse(404, "Item not found!!!"));
        }
    }
    catch (error) {
        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
    }
});
exports.getItemByName = getItemByName;
const getAllItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query_string = req.query;
        let size = query_string.size;
        let page = query_string.page;
        let category = query_string.category;
        let brand = query_string.brand;
        let documentCount = 0;
        let itemList = [];
        if (category != 'All' && brand != 'All') {
            //get data when category and brand both are different
            documentCount = yield item_model_1.default.countDocuments({ category: category, brand: brand });
            itemList = yield item_model_1.default.find({ category: category, brand: brand }).limit(size).skip(size * (page - 1));
        }
        else if (category == 'All' && brand != 'All') {
            //get data only brand both are different
            documentCount = yield item_model_1.default.countDocuments({ brand: brand });
            itemList = yield item_model_1.default.find({ brand: brand }).limit(size).skip(size * (page - 1));
        }
        else if (category != 'All' && brand == 'All') {
            //get data only category both are different
            documentCount = yield item_model_1.default.countDocuments({ category: category });
            itemList = yield item_model_1.default.find({ category: category }).limit(size).skip(size * (page - 1));
        }
        else {
            //get data all data without filtered
            documentCount = yield item_model_1.default.countDocuments();
            itemList = yield item_model_1.default.find().limit(size).skip(size * (page - 1));
        }
        let totalPages = Math.ceil(documentCount / size);
        res.status(200).send(new custom_response_1.CustomResponse(200, "Items found", itemList, documentCount, totalPages));
    }
    catch (error) {
        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
    }
});
exports.getAllItems = getAllItems;
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (req.fileError) {
            //delete image
            fs_1.default.unlinkSync(req.file.path);
            res.status(401).send(new custom_response_1.CustomResponse(401, "Image format not allow"));
        }
        else {
            let user = res.tokenData.user;
            let fileName = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename;
            let item_data = JSON.parse(req.body.item);
            if (user.role === 'admin') {
                let item_by_id = yield item_model_1.default.findOne({ _id: item_data.id });
                if (item_by_id) {
                    yield item_model_1.default.findByIdAndUpdate({ _id: item_data.id }, {
                        code: item_data.code,
                        name: item_data.name,
                        description: item_data.description,
                        category: item_data.category,
                        brand: item_data.brand,
                        regularPrice: item_data.regularPrice,
                        salePrice: item_data.salePrice,
                        qty: item_data.qty,
                        warranty: item_data.warranty,
                        stockStatus: item_data.stockStatus,
                        itemPic: fileName ? `items/${fileName}` : item_data.itemPic
                    }).then(success => {
                        // success object is old object
                        //if you want you can return req body object
                        if (fileName) {
                            //delete image
                            fs_1.default.unlinkSync(`src/media/images/${item_by_id === null || item_by_id === void 0 ? void 0 : item_by_id.itemPic}`);
                        }
                        res.status(200).send(new custom_response_1.CustomResponse(200, "Item update successfully"));
                    }).catch(error => {
                        //delete image
                        if (fileName) {
                            fs_1.default.unlinkSync(`src/media/images/${item_by_id === null || item_by_id === void 0 ? void 0 : item_by_id.itemPic}`);
                        }
                        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
                    });
                }
                else {
                    //delete image
                    if (fileName) {
                        fs_1.default.unlinkSync(req.file.path);
                    }
                    res.status(404).send(new custom_response_1.CustomResponse(404, "Item not found!!!"));
                }
            }
            else {
                //delete image
                if (fileName) {
                    fs_1.default.unlinkSync(req.file.path);
                }
                res.status(401).send(new custom_response_1.CustomResponse(401, "Access Denied"));
            }
        }
    }
    catch (error) {
        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
    }
});
exports.updateItem = updateItem;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = res.tokenData.user;
        if (user.role === 'Admin') {
            let item_by_id = yield item_model_1.default.findOne({ _id: req.query.id });
            if (item_by_id) {
                yield item_model_1.default.deleteOne({ _id: req.query.id })
                    .then(success => {
                    //delete image
                    fs_1.default.unlinkSync(`src/media/images/${item_by_id === null || item_by_id === void 0 ? void 0 : item_by_id.itemPic}`);
                    res.status(200).send(new custom_response_1.CustomResponse(200, "User delete successfully"));
                }).catch(error => {
                    res.status(500).send(new custom_response_1.CustomResponse(500, `Something went wrong : ${error}`));
                });
            }
            else {
                res.status(404).send(new custom_response_1.CustomResponse(404, "Item not found!!!"));
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
exports.deleteItem = deleteItem;
//# sourceMappingURL=item.controller.js.map