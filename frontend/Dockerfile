# Use the official Node.js image from the Docker Hub
FROM node:20.15 AS development

# Create and change to the app directory
WORKDIR /patching-ui

# Copy package.json and package-lock.json
COPY package*.json /patching-ui

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY .  /patching-ui/

CMD [ "npm", "start" ]

FROM development AS build

# Build the app for production
RUN npm run build

# Stage 2 - the production environment
FROM nginx:stable-alpine3.19

# Set the working directory within the container
WORKDIR /usr/share/nginx/html/

# Copy the build output to replace the default nginx contents
COPY --from=build /patching-ui/dist .

# Copy the custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 3000
EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]