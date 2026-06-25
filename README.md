# Advanced E-Commerce API

![Swagger](https://img.shields.io/badge/-Swagger-%23C3E88D?style=for-the-badge&logo=swagger&logoColor=black)
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/-Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/-Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

A production-ready, high-performance E-Commerce Backend RESTful API built with **Node.js, Express, and MongoDB**. This project is specifically designed with a microservices mindset, focusing on advanced features like multi-layer caching, secure HTTP-Only cookie authentication, database atomic operations to handle concurrency, and automated daily reporting systems.

---

## 🚀 Key Features

* **🔒 Secure Authentication:** JWT-based user Sign-Up, Login, and Logout stored inside **HTTP-Only Cookies** to provide robust protection against XSS (Cross-Site Scripting) attacks.
* **⚡ High-Performance Caching:** Integrated with **Upstash Redis (via TLS/SSL)** to cache product catalogs, dramatically reducing MongoDB read queries and improving API response time to milliseconds.
* **🛒 Race-Condition Safe Orders:** Implements MongoDB **Atomic Queries (`findOneAndUpdate` with `$gte`)** to verify and decrement product stock safely during heavy concurrent checkout traffic.
* **📊 Automated Reporting:** A background scheduled cron job that automatically runs every night at 12:00 AM, calculates total revenue, and emails a stylized HTML Sales Report to the Admin via **Resend Email Service**.
* **🛠️ Production Architecture:** Structured using the MVC pattern with robust global error handling, custom database connection pooling, and graceful shutdown setups.

---

## 🛠️ Tech Stack & Tools

* **Runtime Environment:** Node.js (ES Modules)
* **Framework:** Express.js
* **Database:** MongoDB & Mongoose ODM
* **Caching & In-Memory DB:** Upstash Redis (Cloud)
* **Email Engine:** Resend API
* **Task Scheduler:** Node-Cron
* **Security & Auth:** JSON Web Tokens (JWT), Cookie-Parser, Bcrypt.js
* **API Documentation:** Swagger UI (Modular JSON Approach)

---

## ⚙️ Environment Variables
Change .env.example to .env

Add your real data in .env file

---

## Install project
npm install

---

## Run the application 
### Development Mode (with Nodemon)
npm run dev

### Production Mode
npm start

---

## 📖 API Documentation (Swagger UI)

This project includes a fully interactive API documentation built with **Swagger UI** using a Modular JSON approach. This allows frontend developers and interviewers to test all endpoints directly from the browser.

### How to Access Docs
1. Run the server locally using `npm run dev`.
2. Open your browser and navigate to:
   [http://localhost:yourPortNo/api-docs](http://localhost:yourPortNo/api-docs)

### Features Documented:
* **Authentication Module:** Complete flows for User Registration, Login, and Logout (HTTP-Only Cookie details).
* **Products CRUD Module:** Public product retrieval paths and Admin-restricted mutations (Create, Update, Delete) with cache invalidation rules.
* **Orders Module:** Secure checkout mechanisms that require valid authentication tokens.

---

## 🛠️ Testing Secure Endpoints in Swagger

Since this API utilizes **HTTP-Only Cookies** for authentication instead of Bearer Tokens to protect against XSS attacks, follow these steps to test protected routes (e.g., Creating an Order or Admin Product management) inside Swagger UI:

1. Locate the **Authentication** section in Swagger UI.
2. Execute the `/api/auth/login` endpoint with valid credentials.
3. Once login is successful, your browser will automatically store the `jwt` cookie.
4. Now, you can directly hit any protected routes like `POST /api/orders` or `POST /api/products` without manually copying any tokens! Swagger will automatically include the cookie in subsequent requests.


