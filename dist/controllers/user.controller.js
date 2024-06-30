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
exports.handleImage = exports.authUser = exports.getAllUser = exports.deleteUser = exports.updateUser = exports.createUser = void 0;
const process = __importStar(require("process"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const custom_response_1 = require("../dtos/custom.response");
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_2 = __importDefault(require("../models/user.model"));
const imageTest_model_1 = __importDefault(require("../models/imageTest.model"));
const fs_1 = __importDefault(require("fs"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.fileError) {
        res.status(401).send(new custom_response_1.CustomResponse(401, "Image format not allow"));
    }
    else {
        let fileName = req.file.filename;
        let user_data = JSON.parse(req.body.user);
        // console.log(req.body)
        try {
            let user_by_email = yield user_model_1.default.findOne({ email: user_data.email });
            // console.log(user_by_email)
            if (user_by_email) {
                if (fileName) {
                    //delete image
                    fs_1.default.unlinkSync(req.file.path);
                }
                res.status(409).send(new custom_response_1.CustomResponse(409, "Email already used!"));
            }
            else {
                let user_by_username = yield user_model_1.default.findOne({ username: user_data.username });
                if (user_by_username) {
                    if (fileName) {
                        //delete image
                        fs_1.default.unlinkSync(req.file.path);
                    }
                    res.status(409).send(new custom_response_1.CustomResponse(409, "Username already used!"));
                }
                else {
                    bcryptjs_1.default.hash(user_data.password, 8, function (err, hash) {
                        return __awaiter(this, void 0, void 0, function* () {
                            let userModel = new user_model_1.default({
                                username: user_data.username,
                                fullName: user_data.fullName,
                                email: user_data.email,
                                phoneNumber: user_data.phoneNumber,
                                password: hash,
                                role: user_data.role,
                                proPic: `users/${fileName}`
                            });
                            let user = yield userModel.save();
                            if (user) {
                                user.password = "";
                                res.status(200).send(new custom_response_1.CustomResponse(200, "User saved successfully", user));
                            }
                            else {
                                if (fileName) {
                                    //delete image
                                    fs_1.default.unlinkSync(req.file.path);
                                }
                                res.status(500).send(new custom_response_1.CustomResponse(500, `Something went wrong!`));
                            }
                        });
                    });
                }
            }
        }
        catch (error) {
            if (fileName) {
                //delete image
                fs_1.default.unlinkSync(req.file.path);
            }
            res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
        }
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (req.fileError) {
            res.status(401).send(new custom_response_1.CustomResponse(401, "Image format not allow"));
        }
        else {
            let fileName = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename;
            let user_data = JSON.parse(req.body.user);
            console.log(user_data);
            let user_by_username = yield user_model_2.default.findOne({ _id: user_data.id });
            console.log("----");
            console.log(user_by_username);
            if (user_by_username) {
                console.log("//////////////");
                console.log(user_by_username);
                yield user_model_1.default.findByIdAndUpdate({ _id: user_data.id }, {
                    $set: {
                        username: user_data.username,
                        fullName: user_data.fullName,
                        email: user_data.email,
                        phoneNumber: user_data.phoneNumber,
                        role: user_data.role,
                        proPic: fileName ? `users/${fileName}` : user_by_username === null || user_by_username === void 0 ? void 0 : user_by_username.proPic
                    }
                }).then(success => {
                    // success object is old object
                    if (success) {
                        //delete old image
                        if (fileName) {
                            // @ts-ignore
                            fs_1.default.unlinkSync('src/media/images/' + user_by_username.proPic);
                        }
                        success.password = "";
                        res.status(200).send(new custom_response_1.CustomResponse(200, "User update successfully", success));
                    }
                }).catch(error => {
                    //delete image
                    if (fileName) {
                        fs_1.default.unlinkSync(req.file.path);
                    }
                    console.log(error);
                    res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
                });
                // if (user_by_username){
                //
                //     bcrypt.hash(user_data.password, 8, async function (err, hash :string) {
                //
                //         await UserModel.findByIdAndUpdate(
                //             {_id:user_data.id},
                //             {
                //                 username:user_data.username,
                //                 fullName:user_data.fullName,
                //                 email:user_data.email,
                //                 phoneNumber:user_data.phoneNumber,
                //                 password:hash,
                //                 role:user_data.role,
                //                 proPic:fileName ? `users/${fileName}` : user_by_username?.proPic
                //             }
                //         ).then( success => {
                //             // success object is old object
                //             if (success){
                //                 //delete old image
                //                 // @ts-ignore
                //                 // fs.unlinkSync('src/media/images/users/'+user_by_username.proPic);
                //                 fs.unlinkSync('src/media/images/'+user_by_username.proPic);
                //                 res.status(200).send(
                //                     new CustomResponse(200,"User update successfully")
                //                 )
                //             }
                //
                //         }).catch(error => {
                //             //delete image
                //             fs.unlinkSync(req.file.path);
                //             res.status(500).send(
                //                 new CustomResponse(500,`Error : ${error}`)
                //             )
                //         })
                // })
            }
            else {
                //delete image
                fs_1.default.unlinkSync(req.file.path);
                res.status(404).send(new custom_response_1.CustomResponse(404, `User not found!!!`));
            }
        }
    }
    catch (error) {
        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query_string = req.query;
        let id = query_string.id;
        //is my account or not
        if (res.tokenData.user._id == id || res.tokenData.user.role === "admin") {
            //if is not my account then check user role is admin
            let user_by_id = yield user_model_1.default.findOne({ _id: id });
            if (user_by_id) {
                yield user_model_1.default.deleteOne({ _id: id }).then(success => {
                    //delete user image -----------------------------------------------------------
                    // @ts-ignore
                    // fs.unlinkSync(`src/media/images/users/${user_by_id.proPic}`);
                    fs_1.default.unlinkSync(`src/media/images/${user_by_id.proPic}`);
                    res.status(200).send(new custom_response_1.CustomResponse(200, "User delete successfully"));
                }).catch(error => {
                    res.status(500).send(new custom_response_1.CustomResponse(500, `Something went wrong : ${error}`));
                });
            }
            else {
                res.status(404).send(new custom_response_1.CustomResponse(404, "User not found!"));
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
exports.deleteUser = deleteUser;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query_string = req.query;
        let size = query_string.size;
        let page = query_string.page;
        let documentsCount = yield user_model_1.default.countDocuments();
        let totalPages = Math.ceil(documentsCount / size);
        let userList = yield user_model_1.default.find().limit(size).skip(size * (page - 1));
        userList.map(u => {
            u.password = "";
        });
        res.status(200).send(new custom_response_1.CustomResponse(200, "Users found", userList, totalPages));
    }
    catch (error) {
        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
    }
});
exports.getAllUser = getAllUser;
const authUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield user_model_1.default.findOne({ username: req.body.username });
        if (user) {
            let isMache = yield bcryptjs_1.default.compare(req.body.password, user.password);
            if (isMache) {
                generateToken(user, res);
            }
            else {
                res.status(401).json(new custom_response_1.CustomResponse(401, "Wrong Password!!!"));
            }
        }
        else {
            res.status(404).send(new custom_response_1.CustomResponse(404, "User not found!"));
        }
    }
    catch (error) {
        res.status(500).send(new custom_response_1.CustomResponse(500, `Error : ${error}`));
    }
});
exports.authUser = authUser;
const generateToken = (user, res) => {
    user.password = "";
    let expiresIn = "1w";
    jsonwebtoken_1.default.sign({ user }, process.env.SECRET, { expiresIn }, (error, token) => {
        if (error) {
            res.status(500).send(new custom_response_1.CustomResponse(500, `Something went wrong : ${error}`));
        }
        else {
            let res_body = {
                user: user,
                accessToken: token
            };
            res.status(200).send(new custom_response_1.CustomResponse(200, "Access", res_body));
        }
    });
};
const handleImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.fileError) {
        res.status(401).send(new custom_response_1.CustomResponse(401, "Image format not allow"));
    }
    else {
        let fileName = req.file.filename;
        let body = JSON.parse(req.body.user);
        console.log(body);
        let imageModel = new imageTest_model_1.default({
            image: fileName
        });
        yield imageModel.save().then(s => {
            console.log(s);
            if (s) {
                res.status(200).send(new custom_response_1.CustomResponse(200, "Image saved"));
            }
            // fs.unlinkSync(req.file.path);
        }).catch(e => {
            console.log(e);
        });
    }
});
exports.handleImage = handleImage;
//# sourceMappingURL=user.controller.js.map