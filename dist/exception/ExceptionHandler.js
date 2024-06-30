"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exceptionHandler = void 0;
const custom_response_1 = require("../dtos/custom.response");
const process_1 = __importDefault(require("process"));
const AppError_1 = require("../utils/AppError");
const exceptionHandler = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    if (process_1.default.env.NODE_ENV === 'production') {
        let err = Object.assign({}, error);
        if (err.name === 'JsonWebTokenError')
            err = handleJWTError();
        if (err.name === 'TokenExpiredError')
            err = handleJWTExpiredError();
        sendErrorToPro(err, res);
    }
    else {
        sendErrorToDev(error, res);
    }
};
exports.exceptionHandler = exceptionHandler;
const sendErrorToDev = (error, res) => {
    //send error to developer with more details
    res.status(error.statusCode).send(new custom_response_1.CustomResponse(error.customStatusCode ? error.customStatusCode : error.statusCode, error.message, {
        error: error,
        stack: error.stack
    }));
};
const sendErrorToPro = (error, res) => {
    //operational, trusted error -> send msg ti client
    if (error.isOperational) {
        res.status(error.statusCode).send(new custom_response_1.CustomResponse(error.customStatusCode ? error.customStatusCode : error.statusCode, error.message, error.status));
        //programming or unknown error -> don't leak error details to client
    }
    else {
        console.log(`🔥 ERROR 💥 `, error);
        res.status(500).send(new custom_response_1.CustomResponse(500, 'Something went wrong!'));
    }
};
const handleJWTError = () => {
    return new AppError_1.AppError('Invalid token. Please log in again!', 401);
};
const handleJWTExpiredError = () => new AppError_1.AppError('Your token has expired! Please log in again.', 401);
const handleSequelizeError = (err) => new AppError_1.AppError(`Something went wrong!!! \n ${err.parent.sqlMessage}`, 500);
const handleSequelizeForeignKeyError = (err) => new AppError_1.AppError(`Something went wrong!!! 
        Id wrong!! check ids and try again! \n ${err.parent.sqlMessage}`, 500);
const handleSequelizeUniqueError = (err) => new AppError_1.AppError(`Something went wrong!!! 
        Id wrong!! check ${err.errors[0].path} and try again! ${err.errors[0].message}`, 500);
//# sourceMappingURL=ExceptionHandler.js.map