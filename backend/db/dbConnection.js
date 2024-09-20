import mongoose, { connect } from 'mongoose';
import { DB_NAME } from '../src/constants.js';
import {app} from '../src/app.js'

export const dbconnection=async ()=>{
    try {
       const mongooseInstance= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        app.on('error',(error)=>{
            console.log("ERROR",error);
            throw error;
        })
        console.log('Database connected to'+` DB_NAME ${DB_NAME} at ${mongooseInstance.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}