import express from "express";
import {AppError} from "../utils/AppError";


export const restrictTo = (...roles:string[]) => {
    return (req:express.Request,res:any,next:express.NextFunction) => {

        // Check if req.tokenData and req.tokenData.user are defined
        if (!res.tokenData || !res.tokenData.user) {
            return next(
                new AppError(
                    "Token data is missing or user information is not available",
                    401 // Unauthorized error
                )
            );
        }


        //check a user role with permission roles
        if (!roles.includes(res.tokenData.user.role)){
            return next(
                new AppError(
                    "This user don't have permission to perform this action",
                    403) // Forbidden error
            )
        }

        //Access to perform this action
        next();
    }
}