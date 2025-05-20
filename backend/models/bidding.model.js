import mongoose from "mongoose";
const biddingSchema = new mongoose.Schema({
    shipment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shipment',
        required: true
    },
    bidder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
},
    {
        timestamps: true
    });

export const Bidding = mongoose.model("Bidding", biddingSchema);