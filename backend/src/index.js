import dotenv from 'dotenv';
dotenv.config({path:'./.env'});
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import {app} from './app.js';

const port =process.env.PORT||4000;
import {dbconnection} from '../db/dbConnection.js';


dbconnection()
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    })
}
)
.catch((error)=>{
    console.log("Mongodb connection failed",error);
})
