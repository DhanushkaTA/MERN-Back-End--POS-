"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode, customStatusCode) {
        super(message);
        this.statusCode = statusCode;
        this.customStatusCode = customStatusCode;
        this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
        this.isOperational = true;
    }
}
exports.AppError = AppError;
//# sourceMappingURL=AppError.js.map