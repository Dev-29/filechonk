# Use the official Node.js image as the base
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the backend source code
COPY . .

# Expose port 3000 for the backend
EXPOSE 3000

# Start the backend server
CMD ["npm", "start"]
