import express from "express";
import {CustomResponse} from "../dtos/custom.response";
import ItemModel from "../models/item.model";
import {ItemInterface} from "../types/SchemaTypes";
import fs from 'fs'

export const saveItem = async (req :any, res :any) => {
    try {

        if (req.fileError){
            //delete image
            fs.unlinkSync(req.file.path);
            res.status(401).send(
                new CustomResponse(401,"Image format not allow")
            )
        }else {

            let user = res.tokenData.user;
            let fileName:string = req.file.filename;
            let item_data = JSON.parse(req.body.item);

            if (user.role === 'admin') {

                let item_by_code : ItemInterface | null = await ItemModel.findOne({code: item_data.code});

                if (item_by_code) {
                    //delete image
                    fs.unlinkSync(req.file.path);
                    res.status(409).send(
                        new CustomResponse(409,"Code already used!")
                    )

                }else {

                    let itemModel : ItemInterface = new ItemModel({
                        code: item_data.code,
                        description: item_data.description,
                        category: item_data.category,
                        brand: item_data.brand,
                        price: item_data.price,
                        qty: item_data.qty,
                        warranty: item_data.warranty,
                        itemPic: fileName
                    });

                    await itemModel.save().then( success  => {

                        res.status(200).send(
                            new CustomResponse(200,"Item saved successfully.",success)
                        )

                    }).catch( error => {
                        //delete image
                        fs.unlinkSync(req.file.path);
                        res.status(500).send(
                            new CustomResponse(500,`Something went wrong! : ${error}`)
                        )
                    })

                }

            }else {
                //delete image
                fs.unlinkSync(req.file.path);
                res.status(401).send(
                    new CustomResponse(401,"Access Denied")
                )
            }

        }

    }catch (error){
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

export const getItemById = async (req :express.Request, res :any) => {
    try {

        let query_string :any = req.query;
        let code : string =query_string.code;

        let item_by_code :ItemInterface | null = await ItemModel.findOne({code: code});

        if (item_by_code){
            res.status(200).send(
                new CustomResponse(200,"Item found successfully.",item_by_code)
            )
        }else {
            res.status(404).send(
                new CustomResponse(404,"Item not found!!!")
            )
        }

    }catch (error){
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

export const getAllItems = async (req :express.Request, res :any) => {
    try {

        let query_string :any=req.query;
        let size :number = query_string.size;
        let page :number = query_string.page;

        let documentCount :number = await ItemModel.countDocuments();
        let totalPages :number = Math.ceil(documentCount / size);

        let itemList = await ItemModel.find().limit(size).skip(size * (page - 1));

        res.status(200).send(
            new CustomResponse(
                200,
                "Items found",
                itemList,
                totalPages
            )
        )

    }catch (error){
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

export const updateItem = async (req :any, res :any) => {
    try {

        if (req.fileError){
            //delete image
            fs.unlinkSync(req.file.path);
            res.status(401).send(
                new CustomResponse(401,"Image format not allow")
            )
        }else {

            let user = res.tokenData.user;
            let fileName:string = req.file.filename;
            let item_data = JSON.parse(req.body.item);

            if (user.role === 'admin') {

                let item_by_id : ItemInterface | null = await ItemModel.findOne({_id: item_data.id});

                if (item_by_id) {

                    await ItemModel.findByIdAndUpdate(
                        {_id: item_data.id},
                        {
                            code: item_data.code,
                            description: item_data.description,
                            category: item_data.category,
                            brand: item_data.brand,
                            price: item_data.price,
                            qty: item_data.qty,
                            warranty: item_data.warranty,
                            itemPic:fileName
                        }
                    ).then( success => {
                        // success object is old object
                        //if you want you can return req body object
                        res.status(200).send(
                            new CustomResponse(200,"Item update successfully")
                        )

                    }).catch(error => {
                        //delete image
                        fs.unlinkSync(req.file.path);
                        res.status(500).send(
                            new CustomResponse(500,`Error : ${error}`)
                        )
                    })

                } else {
                    //delete image
                    fs.unlinkSync(req.file.path);
                    res.status(404).send(
                        new CustomResponse(404, "Item not found!!!")
                    )

                }

            }else {
                //delete image
                fs.unlinkSync(req.file.path);
                res.status(401).send(
                    new CustomResponse(401,"Access Denied")
                )
            }

        }

    }catch (error){
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

export const deleteItem = async (req :express.Request, res :any) => {
    try {

        let user = res.tokenData.user;

        if (user.role === 'admin'){

            let item_by_id : ItemInterface | null = await ItemModel.findOne({_id: req.query.id});

            if (item_by_id) {

                await ItemModel.deleteOne({_id: req.query.id})
                    .then( success => {
                        //delete image
                        fs.unlinkSync(`src/media/images/${item_by_id?.itemPic}`);

                        res.status(200).send(
                            new CustomResponse(200, "User delete successfully")
                        );
                }).catch(error => {
                        res.status(500).send(
                            new CustomResponse(500, `Something went wrong : ${error}`)
                        );
                })

            } else {
                res.status(404).send(
                    new CustomResponse(404, "Item not found!!!")
                )
            }

        } else {
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