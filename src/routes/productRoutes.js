import express from "express";
import { getProducts, createProduct, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";
import { adminMiddleware, authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
    .get(getProducts) // allow all users
    .post(authMiddleware, adminMiddleware, createProduct); // allow only admin

router.route("/:id")
    .get(getProductById)
    .put(authMiddleware, adminMiddleware, updateProduct)   // allow only admin
    .delete(authMiddleware, adminMiddleware, deleteProduct); // allow only admin

export default router;