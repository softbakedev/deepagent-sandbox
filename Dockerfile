FROM node:20-alpine AS builder

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Set working directory
WORKDIR /app

# Copy package files
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Install dependencies
RUN cd backend && npm ci --only=production
RUN cd frontend && npm ci

# Copy source code
COPY backend/ ./backend/
COPY frontend/ ./frontend/

# Build applications
RUN cd frontend && npm run build
RUN cd backend && npm run build

# Production image
FROM node:20-alpine

# Install dumb-init
RUN apk add --no-cache dumb-init

# Create app directory
WORKDIR /app

# Copy built backend
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/backend/package*.json ./backend/
COPY --from=builder /app/backend/node_modules ./backend/node_modules

# Copy built frontend
COPY --from=builder /app/frontend/dist ./frontend/dist

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S weather -u 1001

# Change ownership
RUN chown -R weather:nodejs /app

# Switch to non-root user
USER weather

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/health || exit 1

# Start application
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "backend/dist/server.js"]