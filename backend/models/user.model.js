import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum:['RoadLancer','Shipper'],
        required:true
    },
    profile:{
        bio:{type:String},
        vehicleName: {type: String},
        vehicleType: {type: String},
        vehicleNumber: {type: String},
        licenseNumber: {type: String},
        cargo: {type: mongoose.Schema.Types.ObjectId, ref: "Shipment"}, 
        vehicleCapacity: {type: String},
        route: {type: String},  
    },
},

{timestamps:true });

export const User = mongoose.model('User', userSchema);