FROM nginx:1.19.0-alpine

ENV APP_HOME=/home/app

RUN \
  rm -rf /etc/nginx/mime.types && \
  rm -rf /etc/nginx/sites-* && \
  rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
COPY gzip.conf /etc/nginx
COPY proxy.conf /etc/nginx
COPY ssl.conf /etc/nginx
COPY mime.types /etc/nginx

# Create the appropriate directories
RUN mkdir $APP_HOME
WORKDIR $APP_HOME
RUN mkdir /var/www && mkdir /var/www/html
RUN mkdir /etc/letsencrypt

# Expose ports
EXPOSE 80
EXPOSE 443
