import dotenv from 'dotenv'
dotenv.config();

import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as process from "process";

import UserRouts from "./routes/user.routs";
import ItemRoutes from "./routes/item.routes";
import WarrantyRoute from "./routes/warranty.route";


let app = express();

app.use(cors({
    origin: "*"
}))

app.use(bodyParser.json());

//------------------------------------------

mongoose.connect(process.env.MONGO_URL as string).then( r => {
    console.log("DB Connected Successfully")
}).catch( error => {
    console.log(`DB Connection Error : ${error}`)
})

//------------------------------------------

app.use('/user',UserRouts);

app.use('/item',ItemRoutes);

app.use('/warranty',WarrantyRoute);

//------------------------------------------

app.listen(8080, () => {
    console.log("Server start on port 8080")
})