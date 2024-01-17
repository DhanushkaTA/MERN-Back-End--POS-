import express from "express";
import {CustomResponse} from "../dtos/custom.response";
import ItemModel from "../models/item.model";
import {ItemInterface} from "../types/SchemaTypes";


export const saveItem = async (req :express.Request, res :any) => {
    try {

        let user = res.tokenData.user;

        if (user.role === 'admin') {

            let item_by_code : ItemInterface | null = await ItemModel.findOne({code: req.body.code});

            if (item_by_code) {
                res.status(409).send(
                    new CustomResponse(409,"Code already used!")
                )

            }else {

                let itemModel : ItemInterface = new ItemModel({
                    code: req.body.code,
                    description: req.body.description,
                    category: req.body.category,
                    brand: req.body.brand,
                    price: req.body.price,
                    qty: req.body.qty,
                    warranty: req.body.warranty,
                    itemPic: "ItemPic"
                });

                await itemModel.save().then( success  => {

                    res.status(200).send(
                        new CustomResponse(200,"Item saved successfully.",success)
                    )

                }).catch( error => {
                    res.status(500).send(
                        new CustomResponse(500,`Something went wrong! : ${error}`)
                    )
                })

            }

        }else {
            res.status(401).send(
                new CustomResponse(401,"Access Denied")
            )
        }

    }catch (error){
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

export const getItemById = async (req :express.Request, res :any) => {

}

export const getAllItems = async (req :express.Request, res :any) => {

}

export const updateItem = async (req :express.Request, res :any) => {

}

export const deleteItem = async (req :express.Request, res :any) => {

}