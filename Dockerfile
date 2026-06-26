# ==========================================
# Stage 1: Base & Dependencies Builder
# ==========================================
FROM node:20-alpine AS builder

# Specifying the working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Only install dependencies needed for production
RUN npm ci --only=production

# Copying all remaining source code
COPY . .


# ==========================================
# Stage 2: Final Production Runtime
# ==========================================
FROM node:20-alpine

# Setting up a production environment for security
ENV NODE_ENV=production

WORKDIR /app

# Copying only the production dependencies and code from Stage 1 (builder) cleanly
COPY --from=builder /app ./

# For security reasons, change the default root user to the non-root 'node' user on Node.
USER node

# To use the PORT in .env or enable the default 5001
EXPOSE 5001

# Starting the application
CMD ["node", "src/server.js"]