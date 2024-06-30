import express from "express";
import {CustomResponse} from "../dtos/custom.response";
import ItemModel from "../models/item.model";
import OrderModel from "../models/order.model";


export const getDetails = async (
    req : any,
    res:any,
    next:express.NextFunction
) => {

    try {

        const itemCount = await ItemModel.countDocuments();
        const emptyItemCount = await ItemModel.countDocuments({qty:0});
        const orderCount = await OrderModel.countDocuments()

        const result_1 = await OrderModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalAmountSum: { $sum: "$totalAmount" }
                }
            }
        ]);

        const totalIncome = result_1.length > 0 ? result_1[0].totalAmountSum : 0;

        // Get today's date at midnight
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        // Get the end of today
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        console.log(startOfDay)
        console.log(endOfDay)

        // Perform the aggregation to sum the totalAmount for today
        const result = await OrderModel.aggregate([
            {
                $match: {
                    date: {
                        $gte: startOfDay,
                        $lt: endOfDay
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmountSum: { $sum: "$totalAmount" }
                }
            }
        ]);

        const todayTotalAmount = result.length > 0 ? result[0].totalAmountSum : 0;

        let data = {
            "itemCount" : itemCount,
            "emptyItemCount" : emptyItemCount,
            "orderCount" : orderCount,
            "totalIncome" : totalIncome,
            "todayTotalAmount" : todayTotalAmount
        }

        console.log(data)

        res.status(200).send(
            new CustomResponse(200,`Get details`,data)
        )

    }catch (error){
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }

}