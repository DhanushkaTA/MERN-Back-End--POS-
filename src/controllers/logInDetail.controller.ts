import express from "express";
import {CustomResponse} from "../dtos/custom.response";
import LogInDetailModel from "../models/logInDetail.model";
import {LogInDetailInterface} from "../types/SchemaTypes";
import {AppError} from "../utils/AppError";


export const addLoginDetail = async (req :express.Request, res :any, next:express.NextFunction) => {
    try {

        let query_string :any = req.query;
        let date_time :Date = query_string.time;

        let logInDetailModel = new LogInDetailModel({
            username:res.tokenData.user.username,
            role:res.tokenData.user.role,
            logInDate:date_time
            // logOutDate:"Not yet"
        });

        let recode :LogInDetailInterface | null = await logInDetailModel.save();

        if (recode) {

            res.status(200).json(
                new CustomResponse(200, "Recoded",recode)
            )

        }else {
            throw new AppError(`Something went wrong`,500)
        }

    }catch (error) {
        next(error)
    }
}

export const getAllLoginRecodes = async (req :express.Request, res :any, next:express.NextFunction) => {
    try {

        if (res.tokenData.user.role === "admin"){

            let query_string :any=req.query;
            let size :number = query_string.size;
            let page :number = query_string.page;

            let documentsCount :number = await LogInDetailModel.countDocuments();
            let totalPages :number = Math.ceil(documentsCount / size);

            let recode_list :LogInDetailInterface[] | null =
                await LogInDetailModel.find().limit(size).skip(size * (page - 1));

            res.status(200).send(
                new CustomResponse(
                    200,
                    "Login Details found",
                    recode_list,
                    documentsCount,
                    totalPages
                )
            )

        }else {
            res.status(401).send(
                new CustomResponse(401,"Access Denied")
            )
        }

    }catch (error) {
        // res.status(500).send(
        //     new CustomResponse(500,`Error : ${error}`)
        // )
        next(error)
    }
}

export const getAllLoginRecodesByUsername = async (req :express.Request, res :any, next:express.NextFunction) => {
    try {

        if (res.tokenData.user.role === "admin"){

            let query_string :any=req.query;
            let size :number = query_string.size;
            let page :number = query_string.page;

            let documentsCount :number =
                await LogInDetailModel.countDocuments({username: new RegExp(req.params.username,'i')});
            let totalPages :number = Math.ceil(documentsCount / size);

            let recode_list :LogInDetailInterface[] | null =
                await LogInDetailModel.find({username: new RegExp(req.params.username,'i')})
                    .limit(size).skip(size * (page - 1));

            res.status(200).send(
                new CustomResponse(
                    200,
                    "Login Details found",
                    recode_list,
                    documentsCount,
                    totalPages
                )
            )

        }else {
            res.status(401).send(
                new CustomResponse(401,"Access Denied")
            )
        }

    }catch (error) {
        // res.status(500).send(
        //     new CustomResponse(500,`Error : ${error}`)
        // )
        next(error)
    }
}


export const getLoginRecodeById = async (req :express.Request, res :any, next:express.NextFunction) => {
    try {

        if (res.tokenData.user.role === "admin"){

            let query_string :any = req.query;
            let id :string = query_string.id;

            let recode :LogInDetailInterface | null = await LogInDetailModel.findOne({_id:id});

            if (recode) {
                res.status(200).send(
                    new CustomResponse(200, "Recode found",recode)
                )
            }else {
                // res.status(404).send(
                //     new CustomResponse(404, "Recode not found")
                // )
                throw new AppError("Recode not found",404)
            }

        } else {
            throw new AppError("Access Denied",401)
        }

    }catch (error) {
        // res.status(500).send(
        //     new CustomResponse(500,`Error : ${error}`)
        // )
        next(error)
    }
}

export const updateLoginRecode = async (req :express.Request, res :any, next:express.NextFunction) => {
    try {

        console.log(req.body.id)

        let recode :LogInDetailInterface | null = await LogInDetailModel.findOne({_id:req.body.id});

        console.log(recode)

        if (!recode) {
            throw new AppError("Recode not found",404)
        }

        await LogInDetailModel.updateOne({_id:req.body.id}, {$set: {logOutDate:req.body.logOutDate}})
            .then(success => {
                res.status(200).send(
                    new CustomResponse(200,"Recode update successfully")
                )
            }).catch(error => {
                // res.status(500).send(
                //     new CustomResponse(500,`Error : ${error}`)
                // )
                next(error)
            })

    }catch (error) {
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}