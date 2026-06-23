import express from "express";
import { addOrderItems, getMyOrders } from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
    .post(authMiddleware, addOrderItems); // login user can buy

router.route("/myorders")
    .get(authMiddleware, getMyOrders);   // read ordered items

export default router;