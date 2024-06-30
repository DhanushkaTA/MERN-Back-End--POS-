import express from "express";
import {CustomResponse} from "../dtos/custom.response";
import process from "process";
import {AppError} from "../utils/AppError";

export const exceptionHandler = (error:any,req:express.Request,res:express.Response,next:express.NextFunction) => {

    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error'

    if (process.env.NODE_ENV === 'production'){

        let err = { ...error };

        if (err.name === 'JsonWebTokenError') err = handleJWTError();
        if (err.name === 'TokenExpiredError') err = handleJWTExpiredError();


        sendErrorToPro(err,res);
    }else {
        sendErrorToDev(error,res);
    }
}

const sendErrorToDev = (error:any,res:express.Response) => {
    //send error to developer with more details
    res.status(error.statusCode).send(
        new CustomResponse(
            error.customStatusCode ? error.customStatusCode:error.statusCode,
            error.message,
            {
                error:error,
                stack:error.stack
            }
        )
    );
}

const sendErrorToPro = (error:any,res:express.Response) => {

    //operational, trusted error -> send msg ti client
    if (error.isOperational){
        res.status(error.statusCode).send(
            new CustomResponse(
                error.customStatusCode ? error.customStatusCode:error.statusCode,
                error.message,
                error.status
            )
        );
        //programming or unknown error -> don't leak error details to client
    }else {
        console.log(`🔥 ERROR 💥 `,error)

        res.status(500).send(
            new CustomResponse(500,'Something went wrong!')
        );
    }
}

const handleJWTError = () =>{
    return new AppError('Invalid token. Please log in again!', 401);
}

const handleJWTExpiredError = () =>
     new AppError('Your token has expired! Please log in again.', 401);

const handleSequelizeError = (err:any) =>
    new AppError(`Something went wrong!!! \n ${err.parent.sqlMessage}`, 500);

const handleSequelizeForeignKeyError = (err:any) =>
    new AppError(`Something went wrong!!! 
        Id wrong!! check ids and try again! \n ${err.parent.sqlMessage}`, 500);

const handleSequelizeUniqueError = (err:any) =>
    new AppError(`Something went wrong!!! 
        Id wrong!! check ${err.errors[0].path} and try again! ${err.errors[0].message}`, 500);