import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { redisClient } from "../config/redis.js";

// Create new order
export const addOrderItems = async (req, res) => {
    const { orderItems, shippingAddress, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ message: "No order items!" });
    }

    try {
        // 1. Continuously check for stock availability and subtract each item.
        for (const item of orderItems) {
            // Atomic Query: Check at the DB level whether the stock is greater than the quantity to be purchased 
            // and then subtract at once (to prevent race conditions)
            const updatedProduct = await Product.findOneAndUpdate(
                {
                    _id: item.product,
                    stock: { $gte: item.qty }, // Stock must be greater than or equal to the qty to be purchased.
                },
                {
                    $inc: { stock: -item.qty }, // Stock will be reduced by the specified qty
                },
                { new: true } // Retrieve new data that has already been extracted
            );

            // If the price rises due to insufficient stock, the order will be canceled without further action.
            if (!updatedProduct) {
                return res.status(400).json({
                    message: `Sorry, ${item.name} is out of stock or does not have enough quantity!`
                });
            }
        }

        // 2. Once all stock is OK, the order will be saved in the database.
        const order = new Order({
            orderItems,
            user: req.user._id, // User ID from AuthMiddleware
            shippingAddress,
            totalPrice,
        });

        const createdOrder = await order.save();

        // 3. The stock has changed and the Redis Cache that displays the product lists will be deleted
        await redisClient.del("all_products");

        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get logged in user orders
export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};