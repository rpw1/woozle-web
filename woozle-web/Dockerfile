FROM nginx:1.17.1-alpine
COPY ../ssl/cert.pem /etc/ssl/cert.pem
COPY ../ssl/key.pem /etc/ssl/key.pem
COPY ../ssl/cloudflare.crt /etc/ssl/cloudflare.crt
COPY woozle-web-nginx.conf /etc/nginx/sites-enabled/woozle-game.com
COPY /dist/woozle/browser /usr/share/nginx/html