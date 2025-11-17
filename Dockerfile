# Set the base image to Node.js 20 Alpine 
FROM node:20-alpine

WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install ca-certificates to ensure HTTPS requests work inside Alpine containers
RUN apk add --no-cache ca-certificates

# Improve npm reliability
RUN npm config set fetch-retry-maxtimeout 120000 \
  && npm config set fetch-timeout 600000 \
  && npm set progress=false \
  && npm config set registry https://registry.npmjs.org/ \
  && npm ci --no-audit --no-fund

# Copy the full project
COPY . .

# Accept **runtime environment variables**
ARG NEXT_PUBLIC_API_BASE
ENV NEXT_PUBLIC_API_BASE=$NEXT_PUBLIC_API_BASE

ARG NEXTAUTH_SECRET
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET

ARG NEXTAUTH_URL
ENV NEXTAUTH_URL=$NEXTAUTH_URL

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
