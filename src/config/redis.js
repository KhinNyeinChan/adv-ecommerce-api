import { createClient } from "redis";
import { config } from "dotenv";

// Read .env before building Redis client
config();

// Cloud Redis need to add tls: true to the socket settings
const redisClient = createClient({
  url: process.env.REDIS_URL,
  socket: {
    tls: true,
    rejectUnauthorized: false, // Pass Self-signed certificate errors 
    connectTimeout: 10000,     // don't log in within 10 seconds, timeout
  },
});

redisClient.on("error", (err) => console.error("Redis Client Error:", err));

export const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log("Upstash Redis Connected Successfully.");
    }
  } catch (error) {
    console.error("Redis Connection Failed:", error.message);
  }
};

export { redisClient };