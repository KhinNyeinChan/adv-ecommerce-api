# Advanced E-Commerce API

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


