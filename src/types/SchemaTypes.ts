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