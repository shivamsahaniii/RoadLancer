import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js"
import { applyBid, getAppliedBids, getBidders, updateStatus } from "../controllers/bidding.controller.js";


const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyBid);
router.route("/get").get(isAuthenticated, getAppliedBids);
router.route("/:id/bidders").get(isAuthenticated, getBidders);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);
export default router;
