"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.uploadPic = exports.storage = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
exports.storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const formDataKeys = Object.keys(req.body);
        console.log('FormData keys:', formDataKeys);
        // if (formDataKeys[0]==='user'){
        //     console.log("users inno ne");
        //     cb(null, 'src/media/images/user')
        // }else if (formDataKeys[0]==='item'){
        //     console.log("item inno ne");
        // }else {
        //     cb(null, 'src/media/images')
        // }
        console.log(formDataKeys[0]);
        let path = getPath(formDataKeys[0]);
        cb(null, path);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path_1.default.extname(file.originalname);
        // let user_data = JSON.parse(req.body.user);
        // console.log(user_data.username);
        // console.log(file)
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});
const getPath = (key) => {
    console.log(key);
    switch (key) {
        case 'user':
            return 'src/media/images/users';
        case 'item':
            return 'src/media/images/items';
        case 'brand':
            return 'src/media/images/brands';
        default:
            return 'src/media/images';
    }
};
exports.uploadPic = (0, multer_1.default)({
    storage: exports.storage,
    fileFilter(req, file, callback) {
        // console.log(file.originalname)
        // console.log(file)
        if (file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/gif') {
            callback(null, true);
        }
        else {
            callback(null, false);
            req.fileError = 'File format is not valid';
        }
    }
});
exports.upload = (0, multer_1.default)({ storage: exports.storage });
//# sourceMappingURL=imageUplode.js.map