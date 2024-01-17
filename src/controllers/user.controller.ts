import express from "express";
import * as process from "process";
import bcrypt from "bcryptjs"
import {CustomResponse} from "../dtos/custom.response";
import UserModel from "../models/user.model";
import {UserInterface} from "../types/SchemaTypes";
import jwt, {Secret} from "jsonwebtoken";
import userModel from "../models/user.model";

export const createUser = async (req : express.Request, res:any) => {

    try {

        let user_by_email : UserInterface | null = await UserModel.findOne({email:req.body.email});

        if (user_by_email){
            res.status(409).send(
                new CustomResponse(409,"Email already used!")
            )
        }else {

            let user_by_username : UserInterface | null = await UserModel.findOne({username:req.body.username});

            if (user_by_username){

                res.status(409).send(
                    new CustomResponse(409,"Username already used!")
                )

            }else {

                bcrypt.hash(req.body.password, 8, async function (err, hash :string) {

                    let userModel =  new UserModel({
                        username: req.body.username,
                        fullName: req.body.fullName,
                        email: req.body.email,
                        phoneNumber: req.body.phoneNumber,
                        password: hash,
                        role: req.body.role,
                        proPic: "proPic"
                    });

                    let user: UserInterface | null = await userModel.save()

                    if (user){
                        user.password="";
                        res.status(200).send(
                            new CustomResponse(
                                200, "User saved successfully",user
                            )
                        );
                    }else {
                        res.status(500).send(
                            new CustomResponse(500,`Something went wrong!`)
                        )
                    }

                })

            }

        }


    }catch (error){
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }

}

export const updateUser = async (req :express.Request, res :any) => {
    try {

        let user_by_username = await userModel.findOne({_id: req.body.id});

        if (user_by_username){

            bcrypt.hash(req.body.password, 8, async function (err, hash :string) {

                await UserModel.findByIdAndUpdate(
                    {_id:req.body.id},
                    {
                        username:req.body.username,
                        fullName:req.body.fullName,
                        email:req.body.email,
                        phoneNumber:req.body.phoneNumber,
                        password:hash,
                        role:req.body.role,
                        proPic:req.body.proPic
                    }
                ).then( success => {
                    // success object is old object
                    if (success){
                        res.status(200).send(
                            new CustomResponse(200,"User update successfully")
                        )
                    }

                }).catch(error => {
                    res.status(500).send(
                        new CustomResponse(500,`Error : ${error}`)
                    )
                })

            })

        }else {
            res.status(404).send(
                new CustomResponse(404,`User not found!!!`)
            )
        }


    }catch (error){
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

export const deleteUser = async (req :express.Request, res :any) => {
    try {

        let query_string :any = req.query;
        let id :string = query_string.id;

        //is my account or not
        if (res.tokenData.user._id != id){
            //if is not my account then check user role is admin
            if (res.tokenData.user.role === "admin"){

                await UserModel.deleteOne({_id:id}).then( success => {
                    res.status(200).send(
                        new CustomResponse(200, "User delete successfully")
                    );
                }).catch(error => {
                    res.status(500).send(
                        new CustomResponse(500, `Something went wrong : ${error}`)
                    );
                })

            } else {
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

export const getAllUser = async (req :express.Request, res :express.Response) => {
    try {

        let query_string :any=req.query;
        let size :number = query_string.size;
        let page :number = query_string.page;

        let documentsCount :number = await UserModel.countDocuments();
        let totalPages :number = Math.ceil(documentsCount / size);

        let userList  =
            await UserModel.find().limit(size).skip(size * (page - 1));

        userList.map(u => {
            u.password=""
        })

        res.status(200).send(
            new CustomResponse(
                200,
                "Users found",
                userList,
                totalPages
            )
        )

    } catch (error){
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

export const authUser = async (req :express.Request, res :any) => {

    try {

        let user : UserInterface | null = await UserModel.findOne({username:req.body.username});

        if (user){

            let isMache :boolean = await bcrypt.compare(req.body.password, user.password);

            if (isMache) {

                generateToken(user,res);

            }else {
                res.status(401).json(
                    new CustomResponse(401,"Wrong Password!!!")
                )
            }

        } else {
            res.status(404).send(
                new CustomResponse(404, "User not found!")
            )
        }

    }catch (error){
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }

}

const generateToken = (user: UserInterface, res :express.Response) => {
    user.password = "";
    let expiresIn = "1w";

    jwt.sign({user}, process.env.SECRET as Secret, {expiresIn}, (error :any,token :any) => {
        if (error){
            res.status(500).send(
                new CustomResponse(500,`Something went wrong : ${error}`)
            )
        } else {

            let res_body={
                user: user,
                accessToken: token
            }

            res.status(200).send(
                new CustomResponse(200,"Access",res_body)
            );

        }
    });
}