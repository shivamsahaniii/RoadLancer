import mongoose from "mongoose";
import { Shipment } from "../models/cargo.model.js";
import { populate } from "dotenv";
import { Bidding } from "../models/bidding.model.js";

export const applyBid = async (req, res) => {
    try {
        const userId = req.id;
        const shipmentId = req.params.id;
        if (!shipmentId) {
            return res.status(400).json({
                message: "Shipment id is required.",
                success: false
            })
        };
        // check if the user has already apply for bid
        const existingApplication = await Bidding.findOne({ shipment: shipmentId, bidder: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this Bid",
                success: false
            });
        }

        // ckeck if the Shipment exists
        const shipment = await Shipment.findById(shipmentId);
        if (!shipment) {
            return res.status(404).json({
                message: "Shipment not found",
                success: false
            })
        }
        //create a new bid
        const newBid = await Bidding.create({
            shipment: shipmentId,
            bidder: userId,
        })

        shipment.bid.push(newBid._id);
        await shipment.save();
        return res.status(201).json({
            message: "Bid applies successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
};

export const getAppliedBids = async (req, res) => {
    try {
        const userId = req.params.id;
        const bid = await Bidding.find({ bidder: userId }).sort({ createAt: -1 }).populate({
            path: 'shipment',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'shipper',
                options: { sort: { createdAt: -1 } },
            }
        });
        if (!bid) {
            return res.status(404).json({
                message: "No Bids",
                success: false
            })
        };
        return res.status(200).json({
            bid,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

//shipper will get to know how man bidder apply
export const getBidders = async (req, res) => {
    try {
        const shipmentId = req.params.id;
        const shipment = await Shipment.findById(shipmentId).populate({
            path: 'bid',
            options: {sort:{createdAt: -1}},
            populate: {
                path: 'bidder',
                options: {sort: { createdAt:-1}},
            }
        });
        if (!shipment) {
            return res.status(404).json({
                message: "Shipments not found.",
                success: false
            })
        };
        return res.status(200).json({
            shipment,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const biddingId = req.params.id;
        if (!status) {
            return res.status(400).json({
                message: "status is required.",
                success: false
            })
        };

        //find the bidding by bid id
        const bidding = await Bidding.findOne({ _id: biddingId });
        if (!bidding) {
            return res.status(404).json({
                message: "Bid not found.",
                success: false
            })
        };

        //update the status
        bidding.status = status.toLowerCase();
        await bidding.save();

        return res.status(200).json({
            message: "status updated successfull.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}