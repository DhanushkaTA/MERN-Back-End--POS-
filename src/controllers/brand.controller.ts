import {CustomResponse} from "../dtos/custom.response";
import BrandModel from "../models/brand.model";
import {BrandInterface} from "../types/SchemaTypes";
import fs from "fs";


export const createBrand = async (req : any, res:any) => {

    if (req.fileError){
        res.status(401).send(
            new CustomResponse(401,"Image format not allow")
        )
    }else {
        let fileName:string = req.file.filename;
        let brand_data = JSON.parse(req.body.brand);

        try {

            let brand_by_name : BrandInterface | null= await BrandModel.findOne({name:brand_data.name});

            if (brand_by_name){
                fs.unlinkSync(req.file.path);

                res.status(409).send(
                    new CustomResponse(409,"Brand already used!")
                )
            }else {
                //save brand in database--------------------------------------------------------------------------

                let brandModel = new BrandModel({
                    name:brand_data.name,
                    image: `brands/${fileName}`
                });

                let new_brand : BrandInterface | null = await brandModel.save();

                if (new_brand){
                    res.status(200).send(
                        new CustomResponse(
                            200, "Brand saved successfully",new_brand
                        )
                    );
                }else {
                    fs.unlinkSync(req.file.path);
                    res.status(500).send(
                        new CustomResponse(500,`Something went wrong!`)
                    )
                }
            }



        }catch (error){
            res.status(500).send(
                new CustomResponse(500,`Error : ${error}`)
            )
        }
    }

}

export const updateBrand = async (req : any, res:any) => {

}

export const getBrand = async (req : any, res:any) => {

}

export const getAllBrands = async (req : any, res:any) => {

}

export const deleteBrand = async (req : any, res:any) => {

}