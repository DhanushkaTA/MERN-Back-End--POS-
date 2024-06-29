import express from "express";
import {CustomResponse} from "../dtos/custom.response";
import OrderModel from "../models/order.model";
import {ItemInterface, OrderDetailsInterface} from "../types/SchemaTypes";
import ItemModel from "../models/item.model";
import {db} from "../index";
import {MongoClient, ObjectId} from 'mongodb'
import process from "process";


export const createOrder =  async (req :express.Request, res :any) => {



    try {

        let session = await OrderModel.startSession();

        await session.withTransaction(async () => {



            //-------------------- update items -----------------------------------------------------------------

            let orderDetails: OrderDetailsInterface[] = req.body.orderDetails;


            for (let item of orderDetails){

                console.log("item : "+item.itemId)

                let item_by_id =
                    await ItemModel.findOne({code:item.itemId});


                console.log("item_by_id : "+item_by_id);

                if (item_by_id) {
                    let update_qty :number = (item_by_id.qty - item.qty);

                    console.log(item_by_id.qty)
                    console.log(item.qty)


                    await ItemModel.findByIdAndUpdate(
                        {_id:item_by_id._id},
                        {$set:{qty:update_qty}}
                    ).session(session).exec()

                }else {
                    throw new Error(`Error : Something wrong with item`)
                }
            }

            //-------------------- update items -----------------------------------------------------------------

            let insertOne = await OrderModel.create([{
                date:req.body.date,
                totalQty:req.body.totalQty,
                totalAmount:req.body.totalAmount,
                customerId:req.body.customerId,
                orderDetails:req.body.orderDetails
            }],{session});



        })

        await session.endSession()

        res.status(500).send(
            new CustomResponse(200,`Order saves successfully`)
        )

    }catch(e){
        console.log(e)
        res.status(500).send(
            new CustomResponse(500,`wade kela una : ${e}`)
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
            new CustomResponse(
                200,
                "Order found successfully",
                order_list,
                documentCount,
                totalPages
            )
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
        let size :number = query.size;
        let page :number = query.page;

        if(isValidObjectId(req.params.id)){
            let documentsCount: number = await OrderModel.countDocuments({_id: req.params.id});
            let totalPages :number = Math.ceil(documentsCount / size);


            let order_list =
                await OrderModel.find(
                    {_id: req.params.id}).limit(size).skip(size * (page - 1));

            res.status(200).send(
                new CustomResponse(
                    200,
                    "Orders found",
                    order_list,
                    documentsCount,
                    totalPages
                )
            )
        }else {
            res.status(200).send(
                new CustomResponse(
                    200,
                    "Orders not found!",
                    [],
                    0,
                    1
                )
            )
        }



    }catch (error) {
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

function isValidObjectId(id:string) {
    return ObjectId.isValid(id) && (String(new ObjectId(id)) === id);
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

