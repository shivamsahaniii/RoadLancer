import { Shipment } from "../models/cargo.model.js";

//Admin will post Shipment
export const postShipment = async (req, res) => {
    try {
        const { title, description, shipmentType, amountRange, pickupLocation, dropLocation } = req.body;
        const userId = req.id;
        
        // Validate top-level fields
        if (!title || !description || !shipmentType || !pickupLocation || !dropLocation || !amountRange) {
            return res.status(400).json({
                message: "Some required fields are missing.",
                success: false
            });
        }
        
        // Validate nested fields inside amountRange
        const { minAmount, maxAmount } = amountRange;
        if (!minAmount || !maxAmount) {
            return res.status(400).json({
                message: "Both minAmount and maxAmount are required in amountRange.",
                success: false
            });
        }
        
        // Create the shipment
        const shipment = await Shipment.create({
            title,
            description,
            shipmentType,
            amountRange: {
                minAmount,
                maxAmount
            },
            pickupLocation,
            dropLocation,
            shipper: userId
        });

        return res.status(200).json({
            message: "New Shipment created successfully.",
            shipment,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

// for student
export const allShipments = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const shipments = await Shipment.find(query).populate({
            path:"shipper"
        }).sort({createdAt:-1});
        if (!shipments) {
            return res.status(404).json({
                message: "Shipment not foundd",
                success: false
            })
        };
        return res.status(200).json({
            shipments,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

//for Student 
export const getShipmentById = async (req, res) => {
    try {
        const shipmentId = req.params.id;
        const shipment = await Shipment.findById(shipmentId).populate({
            path:"bid"
        })
        if (!shipment) {
            return res.status(404).json({
                message: "Shipment not found",
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

//how much job did admin created till now
export const getAdminShipments = async (req, res) => {
    try {
        const adminId = req.id;
        const shipments = await Shipment.find({ shipper: adminId });
        if (!shipments) {
            return res.status(404).json({
                message: "Shipment not found",
                success: false
            })
        };
        return res.status(200).json({
            shipments,
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}