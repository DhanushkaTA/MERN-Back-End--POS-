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
exports.deleteBrand = exports.getAllBrands = exports.getAllBrandsByCategory = exports.getBrand = exports.updateBrand = exports.createBrand = void 0;
const custom_response_1 = require("../dtos/custom.response");
const brand_model_1 = __importDefault(require("../models/brand.model"));
const fs_1 = __importDefault(require("fs"));
const createBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.fileError) {
        res.status(401).send(new custom_response_1.CustomResponse(401, "Image format not allow"));
    }
    else {
        let fileName = req.file.filename;
        let brand_data = JSON.parse(req.body.brand);
        try {
            let brand_by_name = yield brand_model_1.default.findOne({ name: brand_data.name });
            if (brand_by_name) {
                fs_1.default.unlinkSync(req.file.path);
                res.status(409).send(new custom_response_1.CustomResponse(409, "Brand already used!"));
            }
            else {
                //save brand in database--------------------------------------------------------------------------
                let brandModel = new brand_model_1.default({
                    name: brand_data.name,
                    category: brand_data.category,
                    image: `brands/${fileName}`
                });
                let new_brand = yield brandModel.save();
                if (new_brand) {
                    res.status(200).send(new custom_response_1.CustomResponse(200, "Brand saved successfully", new_brand));
                }
                else {
                    fs_1.default.unlinkSync(req.file.path);
                    res.status(500).send(new custom_response_1.CustomResponse(500, `Something went wrong!`));
                }
            }
        }
        catch (error) {
            //delete image
            fs_1.default.unlinkSync(req.file.path);
            res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
        }
    }
});
exports.createBrand = createBrand;
const updateBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.fileError) {
        res.status(401).send(new custom_response_1.CustomResponse(401, "Image format not allow"));
    }
    else {
        let fileName = req.file.filename;
        let brand_data = JSON.parse(req.body.brand);
        try {
            let brand_by_name = yield brand_model_1.default.findOne({ name: brand_data.name });
            console.log(brand_by_name);
            if (brand_by_name) {
                //update brad details --------------------------------------------------------------------
                yield brand_model_1.default.findByIdAndUpdate({ _id: brand_data.id }, {
                    name: brand_data.name,
                    category: brand_data.category,
                    image: `brands/${fileName}`
                }).then(success => {
                    if (success) {
                        //delete old image---------------------------------
                        // fs.unlinkSync('src/media/images/brands/'+brand_by_name?.image);
                        res.status(200).send(new custom_response_1.CustomResponse(200, "User update successfully"));
                    }
                }).catch(error => {
                    //delete image
                    fs_1.default.unlinkSync(req.file.path);
                    res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
                });
            }
            else {
                //delete image
                fs_1.default.unlinkSync(req.file.path);
                res.status(409).send(new custom_response_1.CustomResponse(409, "Brand not found!"));
            }
        }
        catch (error) {
            //delete image
            fs_1.default.unlinkSync(req.file.path);
            res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
        }
    }
});
exports.updateBrand = updateBrand;
const getBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let brand_by_name = yield brand_model_1.default.findOne({ name: req.params.brand });
        if (brand_by_name) {
            res.status(200).send(new custom_response_1.CustomResponse(200, "Brand found successfully", brand_by_name));
        }
        else {
            res.status(404).send(new custom_response_1.CustomResponse(404, "Brand not fount!!!"));
        }
    }
    catch (error) {
        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
    }
});
exports.getBrand = getBrand;
const getAllBrandsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let brand_list = yield brand_model_1.default.find({ category: req.params.category });
        res.status(200).send(new custom_response_1.CustomResponse(200, "Brands found successfully.", brand_list));
    }
    catch (error) {
        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
    }
});
exports.getAllBrandsByCategory = getAllBrandsByCategory;
const getAllBrands = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query_string = req.query;
        let size = query_string.size;
        let page = query_string.page;
        let category = query_string.category;
        let documentCount = yield brand_model_1.default.countDocuments();
        let brand_list = [];
        console.log(category + " : " + size);
        if (category === 'All' && size != -1) {
            console.log(1);
            brand_list = yield brand_model_1.default.find().limit(size).skip(size * (page - 1));
        }
        else if (size == -1 && category != 'All') {
            console.log(2);
            documentCount = yield brand_model_1.default.countDocuments({ category: category });
            brand_list = yield brand_model_1.default.find({ category: category });
        }
        else if (category === 'All' && size == -1) {
            console.log(3);
            brand_list = yield brand_model_1.default.find();
        }
        else {
            console.log(4);
            documentCount = yield brand_model_1.default.countDocuments({ category: category });
            brand_list = yield brand_model_1.default.find({ category: category }).limit(size).skip(size * (page - 1));
        }
        let totalPages = Math.ceil(documentCount / size);
        res.status(200).send(new custom_response_1.CustomResponse(200, "Brands found successfully.", brand_list, totalPages));
    }
    catch (error) {
        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
    }
});
exports.getAllBrands = getAllBrands;
const deleteBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let brand_by_name = yield brand_model_1.default.findOne({ name: req.params.brand });
        if (brand_by_name) {
            yield brand_model_1.default.deleteOne({ name: req.params.brand })
                .then(success => {
                fs_1.default.unlinkSync(`src/media/images/${brand_by_name === null || brand_by_name === void 0 ? void 0 : brand_by_name.image}`);
                res.status(200).send(new custom_response_1.CustomResponse(200, "Brand delete successfully"));
            })
                .catch(error => {
                console.log(error);
                res.status(500).send(new custom_response_1.CustomResponse(500, `Something went wrong : ${error}`));
            });
        }
        else {
            res.status(404).send(new custom_response_1.CustomResponse(404, `Brand not found!`));
        }
    }
    catch (error) {
        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
    }
});
exports.deleteBrand = deleteBrand;
//# sourceMappingURL=brand.controller.js.map