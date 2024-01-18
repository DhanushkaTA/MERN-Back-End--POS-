import multer from 'multer'
import path from 'path'
import express from "express";
import e from "cors";

export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("methwnta awa");
        cb(null, 'src/media/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})


export const uploadPic = multer({
    storage: storage,
    fileFilter(req: any, file: Express.Multer.File, callback: multer.FileFilterCallback) {
        console.log(file.originalname)
        console.log(file)
        if (file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/gif'){

            callback(null,true)
        }else {
            callback(null,false)
            req.fileError = 'File format is not valid'
        }
    }
})

export const upload = multer({ storage: storage })