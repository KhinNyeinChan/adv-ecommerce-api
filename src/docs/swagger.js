import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import { config } from "dotenv";

// Read .env file
config({ path: path.resolve(process.cwd(), ".env") });
const PORT = process.env.PORT || 5001;

// Read json files
const authDocs = JSON.parse(fs.readFileSync(path.resolve("src/docs/auth.swagger.json"), "utf8"));
const productDocs = JSON.parse(fs.readFileSync(path.resolve("src/docs/products.swagger.json"), "utf8"));
const orderDocs = JSON.parse(fs.readFileSync(path.resolve("src/docs/orders.swagger.json"), "utf8"));

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Advanced E-Commerce API",
    version: "1.0.0",
    description: "Production-ready E-Commerce Backend API",
  },
  servers: [
    {
      url: `http://localhost:${PORT}`,
      description: "Development Server",
    }
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "jwt"
      }
    }
  },
  // Merge paths from subfiles here
  paths: {
    ...authDocs,
    ...productDocs,
    ...orderDocs
  }
};

export const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
};