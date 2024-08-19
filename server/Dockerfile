# Stage 1: Install dependencies and build the app. Use a Node.js base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Run the app and connect to database by providing environment variables
# FROM node:20-alpine

# WORKDIR /app

# COPY --from=build /app/node_modules ./node_modules
# COPY --from=build /app/dist ./dist
# COPY --from=build /app/.env .env

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
