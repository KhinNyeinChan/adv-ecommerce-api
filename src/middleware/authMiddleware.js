import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Check if the user is logged in
export const authMiddleware = async (req, res, next) => {
    let token;

    // 1. Read the 'jwt' token from the cookie
    token = req.cookies.jwt;

    if (token) {
        try {
            // 2. Verify the token using the secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Use the ID from the token to find the user in the database and attach it to req.user (excluding the password)
            req.user = await User.findById(decoded.id).select("-password");

            // 4. Allow the request to proceed to the next middleware or controller
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: "Not authorized, token failed!" });
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token!" });
    }
};

// Admin Guard: Only allow access to users with the 'admin' role
export const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Not authorized as an admin!" });
    }
};