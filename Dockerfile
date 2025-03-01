FROM nginx:1.17.1-alpine
COPY ssl/cert.pem /etc/ssl/cert.pem
COPY ssl/key.pem /etc/ssl/key.pem
COPY ssl/cloudflare.crt /etc/ssl/cloudflare.crt
COPY proxy-nginx.conf /etc/nginx/conf.d/default.conf