"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictTo = void 0;
const AppError_1 = require("../utils/AppError");
const restrictTo = (...roles) => {
    return (req, res, next) => {
        // Check if req.tokenData and req.tokenData.user are defined
        if (!res.tokenData || !res.tokenData.user) {
            return next(new AppError_1.AppError("Token data is missing or user information is not available", 401 // Unauthorized error
            ));
        }
        //check a user role with permission roles
        if (!roles.includes(res.tokenData.user.role)) {
            return next(new AppError_1.AppError("This user don't have permission to perform this action", 403) // Forbidden error
            );
        }
        //Access to perform this action
        next();
    };
};
exports.restrictTo = restrictTo;
//# sourceMappingURL=roleVerify.js.map