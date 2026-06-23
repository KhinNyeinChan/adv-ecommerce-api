import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";

// Import routes
import authRoutes from "./routes/authRoutes.js";

config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Cookie parser middleware to handle cookies

// API routes
app.use("/api/auth", authRoutes);

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections (e.g., database connection errors)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
