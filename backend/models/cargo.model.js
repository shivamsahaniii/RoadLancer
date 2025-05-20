import mongoose from "mongoose";

const cargoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    shipmentType: {
        type: String,
        required: true
    },
    amountRange: {
        minAmount: { type: Number, required: true, min: 0 },
        maxAmount: {
            type: Number, required: true, validate: {
                validator: function (value) {
                    return value >= this.amountRange.minAmount;
                },
                message: 'Max amount must be greater than or equal to min amount'
            }
        },
    },
    pickupLocation: {
        type: String,
        required: true
    },
    dropLocation: {
        type: String,
        required: true
    },
    shipper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bid: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bidding'
        }
    ]
},  
{
    timestamps: true
});

export const Shipment = mongoose.model("Shipment", cargoSchema);