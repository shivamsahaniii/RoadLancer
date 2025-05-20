import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js"
import { allShipments, getAdminShipments, getShipmentById, postShipment } from "../controllers/cargo.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postShipment);
router.route("/get").get(isAuthenticated, allShipments);
router.route("/getAdminShipments").get(isAuthenticated, getAdminShipments);
router.route("/get/:id").get(isAuthenticated, getShipmentById);

export default router;
