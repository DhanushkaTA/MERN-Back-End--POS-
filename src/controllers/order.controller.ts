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
        let query:any = req.query;
        let orderId :string = query.order;

        let order_by_id = await OrderModel.findOne({_id:orderId});

        if (order_by_id){
            await OrderModel.deleteOne({_id:orderId}).then(success => {
                res.status(200).send(
                    new CustomResponse(200,"Order deleted successfully")
                );
            }).catch(error => {
                res.status(500).send(
                    new CustomResponse(500,`Error : ${error}`)
                )
            })
        }else {
            res.status(404).send(
                new CustomResponse(404,`Order not found!!!`)
            )
        }

    }catch (error) {
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

export const getAllOrders = async (req :express.Request, res :any) => {
    try {

        let query:any = req.query;
        let size :number = query.size;
        let page :number = query.page;

        let documentCount: number = await OrderModel.countDocuments();
        let totalPages :number = Math.ceil(documentCount / size);

        let order_list = await OrderModel.find().limit(size).skip(size * (page - 1));

        res.status(200).send(
            new CustomResponse(200,"Order found successfully",order_list,totalPages)
        )

    }catch (error) {
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

export const getOrderById = async (req :express.Request, res :any) => {
    try {

        let query:any = req.query;
        let orderId :string = query.order;

        let order_by_id = await OrderModel.findOne({_id:orderId});

        if (order_by_id){
            res.status(200).send(
                new CustomResponse(200,"Order found successfully",order_by_id)
            );
        }else {
            res.status(404).send(
                new CustomResponse(404,`Order not found!!!`)
            )
        }

    }catch (error) {
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

const isExitsOrder = async (orderId:string, res:any)=> {
    try {

        await OrderModel.findOne({_id:orderId}).then(success => {
            return success;
        }).catch(error => {
            res.status(500).send(
                new CustomResponse(500,`Error can't find: ${error}`)
            )
        })

    }catch (error){
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

