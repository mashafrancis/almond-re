FROM certbot/certbot

RUN apk update && apk add bash curl netcat-openbsd
ENV APP_HOME=/home/app

RUN mkdir -p /var/www && mkdir /var/www/html
RUN mkdir -p /etc/letsencrypt && mkdir -p /etc/letsencrypt/live
RUN mkdir -p $APP_HOME

COPY ./setup.sh $APP_HOME
RUN chmod +x $APP_HOME/setup.sh
