//  make patient schema

import e from 'cors';
import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    diagonosis:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    blood_group:{
        // type enum is used to restrict the value of blood group to only the values in the array
        type: String,
        enum: ['A+','A-','B+','B-','AB+','AB-','O+','O-'],
        required: true
    },
    gender:{
        type: String,
        enum:["M","F","O"],
        required: true
    },
    admittedIn:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "hospital",
    }
},{timestamps: true});

export const patient = mongoose.model("patient", patientSchema);
