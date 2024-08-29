# Stage 1: Install dependencies and build the app. Use a Node.js base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install MySQL client
RUN apk add mysql-client --no-cache

# Copy the wait-for-it.sh script
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npx prisma generate && npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app, and seed script
# CMD sh -c "npx prisma migrate deploy && npx prisma generate && npx prisma db seed && npm start"

# CMD ["npm", "run", "start"]
# CMD ["sh", "-c", "./wait-for-it.sh mariadb:3306 -- npx prisma migrate deploy && npx prisma db seed && npm start"]