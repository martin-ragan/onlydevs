# Use the official Bun image
FROM oven/bun:1

# Set working directory
WORKDIR /app

# Copy package.json files
COPY package.json bun.lockb ./
COPY packages/common-types/package.json ./packages/common-types/
COPY packages/web/package.json ./packages/web/
COPY packages/ui/package.json ./packages/ui/

WORKDIR /app/packages/ui
RUN bun run build

WORKDIR /app
# Install dependencies
RUN bun install

# Copy the rest of the application
COPY . .

# Set working directory to web
WORKDIR /app/packages/web

CMD bun db:migrate && bun run build && bun ./build/index.js