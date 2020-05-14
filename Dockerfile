# STAGE 1: build
# base image
FROM node:14-alpine AS build

LABEL maintainer="Francis Masha" MAINTAINER="Francis Masha <francismasha96@gmail.com>"
LABEL application="almond-re"

ARG NODE_ENV=$NODE_ENV
ENV TERM=xterm-256color NODE_ENV="${NODE_ENV}"

#RUN mkdir /app && chown -R node:node /app
RUN mkdir /app

# the working directory where the application would be started
WORKDIR /app

# The yarn.lock and package.json file is copied so that the versions
# in the package.json are not upgraded from what is present in the
# local package.json to a higher version in the container image.
COPY . /app/

# update the alpine image and install curl
RUN apk update && apk add curl

# installing Alpine Dependencies, but the context for the command from `yarn install` is explained above
RUN apk add --no-cache --virtual .build-deps1 g++ gcc libcap libgcc libstdc++ linux-headers make python && \
    apk add --no-cache --virtual .npm-deps cairo-dev jpeg-dev libjpeg-turbo-dev pango pango-dev && \
    apk add bash

RUN npm install yarn@1.22.x && rm -rf package-lock.json

COPY package.json yarn.lock ./

#COPY --chown=node:node package.json yarn.lock ./

RUN yarn install
RUN yarn run build

# STAGE 2: nginx
FROM nginx:1.17.6-alpine

WORKDIR /app

# setup nginx configurations
# Remove (some of the) default nginx config
RUN \
  rm -rf /etc/nginx/conf.d/default.conf && \
  rm -rf /etc/nginx/nginx.conf && \
  rm -rf /etc/nginx/mime.types && \
  rm -rf /etc/nginx/sites-*

COPY nginx/mime.types /etc/nginx/
COPY ./nginx.conf /etc/nginx/
COPY nginx/*.conf /etc/nginx/conf.d/

# add permissions for nginx user
RUN \
  chown -R nginx:nginx /app && \
  chmod -R 755 /app && \
  chown -R nginx:nginx /var/cache/nginx && \
  chown -R nginx:nginx /var/log/nginx && \
  chown -R nginx:nginx /etc/nginx/conf.d

RUN \
  touch /var/run/nginx.pid && \
  chown -R nginx:nginx /var/run/nginx.pid

# From ‘build’ stage copy the artifacts in dist/ to the default nginx public folder
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html

RUN apk add libcap

RUN setcap 'cap_net_bind_service=+ep' /usr/sbin/nginx
RUN setcap 'cap_net_bind_service=+ep' /etc/nginx/nginx.conf

# switch to non-root user
USER nginx:nginx

# fire up nginx
EXPOSE 80

ENTRYPOINT ["/app/entrypoint.sh"]

#CMD /bin/sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'

#CMD ["nginx","-g","daemon off;"]
