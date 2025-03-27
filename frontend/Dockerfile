# Stage 1: Build the React App
FROM node:18-alpine AS builder
WORKDIR /
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the App Using Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /dist/index.html ./index.html  
COPY --from=builder /dist/assets ./assets

# Expose the correct port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
