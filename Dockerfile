# Stage 1: Build frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Go backend
FROM golang:1.25-alpine AS backend-builder
WORKDIR /app
COPY backend/go.mod ./
RUN go mod download
COPY backend/ ./
RUN go build -o portfolio .

# Stage 3: Final image
FROM alpine:latest
WORKDIR /app
COPY --from=backend-builder /app/portfolio .
COPY --from=frontend-builder /app/frontend/dist ./dist
EXPOSE 8080
CMD ["./portfolio"]
