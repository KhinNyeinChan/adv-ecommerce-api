import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const isProduction = process.env.NODE_ENV === "production";

        // Set options for Production and Development environments
        const mongooseOptions = {
            autoIndex: !isProduction, // Close index creation in Production for better performance
            maxPoolSize: isProduction ? 50 : 10, // Increase connection pool size in Production for better concurrency
            serverSelectionTimeoutMS: 5000, // Timeout for server selection (5 seconds)
        };

        const conn = await mongoose.connect(process.env.MONGO_URI, mongooseOptions);

        console.log(`MongoDB Connected [Mode: ${process.env.NODE_ENV || 'development'}]: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

export const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log("MongoDB Disconnected Successfully.");
    } catch (error) {
        console.error(`Error during MongoDB disconnection: ${error.message}`);
    }
};