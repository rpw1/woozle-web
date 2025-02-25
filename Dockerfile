FROM node:20.17.2 as builder
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY /dist/woozle/browser /usr/share/nginx/html