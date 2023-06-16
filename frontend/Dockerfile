# Use the official Node.js image as the base
FROM node:14 as builder

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the frontend source code
COPY . .

# Build the frontend
RUN npm run build

# Use a lightweight Node.js image as the final base
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy the built frontend from the builder stage
COPY --from=builder /app/build .

# Install serve to run the frontend
RUN npm install -g serve

# Expose port 9000 for the frontend
EXPOSE 9000

# Start the frontend server
CMD ["serve", "-s", "."]
