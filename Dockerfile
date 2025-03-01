FROM nginx:1.17.1-alpine
COPY ssl/cert.pem /etc/ssl/cert.pem
COPY ssl/key.pem /etc/ssl/key.pem
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY /dist/woozle/browser /usr/share/nginx/html