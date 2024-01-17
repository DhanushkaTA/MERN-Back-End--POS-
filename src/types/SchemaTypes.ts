import * as mongoose from "mongoose";

export interface UserInterface extends mongoose.Document{
    username: string,
    fullName: string,
    email: string,
    phoneNumber: number,
    password: string,
    role: string,
    proPic: string
}


export interface ItemInterface extends mongoose.Document{
    code: string,
    description: string,
    category: string,
    brand: string,
    price: number,
    qty: number;
    warranty: string,
    itemPic: string
}