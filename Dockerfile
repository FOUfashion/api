# Base image
FROM iojs

# Set the working dir
WORKDIR /app

# Copy app files
COPY package.json /app/
COPY build/ /app/build/

# Install deps
RUN npm install

# Start command
CMD ["npm", "start"]

# Expose port
EXPOSE 5000
