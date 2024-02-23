import {CustomResponse} from "../dtos/custom.response";


export const createBrand = async (req : any, res:any) => {

    if (req.fileError){
        res.status(401).send(
            new CustomResponse(401,"Image format not allow")
        )
    }else {
        let fileName:string = req.file.filename;
        let brand_data = JSON.parse(req.body.brand);

        try {

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