import express from "express";
import {CustomResponse} from "../dtos/custom.response";
import OrderModel from "../models/order.model";


export const createOrder =  async (req :express.Request, res :any) => {
    try {

        let orderDetails = req.body.orderDetails;

        console.log(orderDetails)
        console.log(orderDetails[1])

        let orderModel = new OrderModel({
            date:req.body.date,
            totalQty:req.body.totalQty,
            totalAmount:req.body.totalAmount,
            customerId:req.body.customerId,
            orderDetails:req.body.orderDetails
        });

        let newVar = await orderModel.save();

        if (newVar) {
            res.status(200).send(
                new CustomResponse(200,`hari`)
            )
        }else {
            res.status(500).send(
                new CustomResponse(200,`wade kela una`)
            )
        }



    } catch (error) {
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

export const updateOrder = async (req :express.Request, res :any) => {
    try {

    }catch (error) {
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

export const deleteOrder = async (req :express.Request, res :any) => {
    try {

    }catch (error) {
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

export const getAllOrders = async (req :express.Request, res :any) => {
    try {

    }catch (error) {
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

export const getOrderById = async (req :express.Request, res :any) => {
    try {

    }catch (error) {
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

