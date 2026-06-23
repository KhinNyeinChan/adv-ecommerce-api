import Product from "../models/Product.js";
import { redisClient } from "../config/redis.js";

// Get all products (with Redis Caching)
export const getProducts = async (req, res) => {
  try {
    const cacheKey = "all_products";

    // 1. Check Cache in Redis
    const cachedProducts = await redisClient.get(cacheKey);
    if (cachedProducts) {
      console.log("Serving from Redis Cache");
      return res.json(JSON.deserialize ? JSON.deserialize(cachedProducts) : JSON.parse(cachedProducts));
    }

    // 2. If no cache, retrieve from DB
    console.log("Serving from MongoDB Database");
    const products = await Product.find({});

    // 3. The result will be stored in Redis for 1 minute (60s) to make it faster next time.
    await redisClient.setEx(cacheKey, 60, JSON.stringify(products));

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a product (Admin Only)
export const createProduct = async (req, res) => {
  const { name, description, price, category, stock, image } = req.body;

  try {
    const product = await Product.create({ name, description, price, category, stock, image });

    // The Redis Cache showing old results will be immediately deleted as new items have arrived.
    await redisClient.del("all_products");

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product (Admin Only)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (product) {
      await redisClient.del("all_products"); // Clear cache
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product (Admin Only)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      await redisClient.del("all_products"); // Clear cache
      res.json({ message: "Product removed successfully" });
    } else {
      res.status(404).json({ message: "Product not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};