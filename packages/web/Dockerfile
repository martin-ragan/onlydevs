# Use Node.js LTS as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY packages/web/package*.json ./packages/web/
COPY packages/ui/package*.json ./packages/ui/

# Install dependencies
RUN npm ci

# Copy source code for both packages
COPY packages/web ./packages/web
COPY packages/ui ./packages/ui

# Build UI package first
RUN npm run build --workspace=ui

# Build web package
RUN npm run build --workspace=web

# Expose port (typically 3000 for Next.js/React apps)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start", "--workspace=web"]
