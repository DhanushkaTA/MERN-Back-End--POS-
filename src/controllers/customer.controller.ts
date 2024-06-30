import express from "express";
import {CustomResponse} from "../dtos/custom.response";
import CustomerModel from "../models/customer.model";
import {CustomerInterface} from "../types/SchemaTypes";
import {AppError} from "../utils/AppError";


export const addCustomer = async (req :express.Request, res :any, next:express.NextFunction) => {
    try {

        let customer_by_nic : CustomerInterface | null = await CustomerModel.findOne({nic:req.body.nic});

        if (customer_by_nic) {
            // res.status(409).send(
            //     new CustomResponse(409,"Nic already used!")
            // )
            throw new AppError("Nic already used!",409)
        }

        let customerModel  = new CustomerModel({
            nic:req.body.nic,
            fullName:req.body.fullName,
            email:req.body.email,
            phoneNumber:req.body.phoneNumber
        })

        let new_customer = await customerModel.save();

        res.status(200).send(
            new CustomResponse(200,"Customer saved successfully.",new_customer)
        )

    } catch (error) {
        // res.status(500).send(
        //     new CustomResponse(500,`Error : ${error}`)
        // )
        next(error)
    }
}

export const getAllCustomers = async (req :express.Request, res :any, next:express.NextFunction) => {
    try {

        let query_string :any = req.query;
        let size :number = query_string.size;
        let page :number = query_string.page;

        let documentCount :number = await CustomerModel.countDocuments();
        let totalPages :number = Math.ceil(documentCount / size);

        let customer_list =
            await CustomerModel.find().limit(size).skip(size * (page - 1));

        res.status(200).send(
            new CustomResponse(
                200,
                "Item found successfully.",
                customer_list,
                totalPages)
        )

    } catch (error) {
        next(error)
    }
}

export const getCustomerByNic = async (req :express.Request, res :any, next:express.NextFunction) => {
    try {

        let customer :CustomerInterface | null = await CustomerModel.findOne({nic:req.params.nic});

        if (customer) {
            res.status(200).send(
                new CustomResponse(200,"Customer fount successfully",customer)
            )
        } else {
            throw new AppError("Customer not fount!!!",404)
        }



    } catch (error) {
        next(error)
    }
}

export const updateCustomer = async (req :express.Request, res :any, next:express.NextFunction) => {
    try {

        let customer :CustomerInterface | null = await CustomerModel.findOne({_id:req.body.id});

        if (!customer) {
            throw new AppError("Customer not fount!!!",404)
        }

        await CustomerModel.findByIdAndUpdate(
            {_id:req.body.id},
            {
                nic:req.body.nic,
                fullName:req.body.fullName,
                email:req.body.email,
                phoneNumber:req.body.phoneNumber,
            }
        ).then(success => {
            res.status(200).send(
                new CustomResponse(200,"Customer update successfully")
            )
        }).catch(error => {
            next(error)
        })

    } catch (error) {
        next(error)
    }
}

export const deleteCustomer = async (req :express.Request, res :any, next:express.NextFunction) => {
    try {

        let query_string :any = req.query;
        let nic :string = query_string.nic;

        let customer :CustomerInterface | null = await CustomerModel.findOne({nic:nic});

        if (!customer) {
            throw new AppError("Customer not fount!!!",404)
        }

        await CustomerModel.deleteOne({nic:nic}).then(success => {
            res.status(200).send(
                new CustomResponse(200, "Customer delete successfully")
            );
        }).catch(error => {
            next(error)
        })

    } catch (error) {
        next(error)
    }
}