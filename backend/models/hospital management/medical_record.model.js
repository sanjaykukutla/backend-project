import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema({
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "patient",
        required: true
    },
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "doctor",
        required: true
    },
    hospital:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "hospital",
        required: true
    },
    diagonosis:{
        type: String,
        required: true
    },
    prescription:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    // type enum is used to restrict the value of blood group to only the values in the array
    bloodGroup:{
        type: String,
        enum: ['A+','A-','B+','B-','AB+','AB-','O+','O-'],
        required: true
    },
    
},{timestamps: true});


export const medicalRecord = mongoose.model("medicalRecord", medicalRecordSchema);