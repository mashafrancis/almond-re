# STAGE 1: build
# base image
FROM node:12.2.0-alpine AS build

LABEL maintainer="Francis Masha" MAINTAINER="Francis Masha <francismasha96@gmail.com>"
LABEL application="almond-re"

# the working directory where the application would be started
WORKDIR /app

# The yarn.lock and package.json file is copied so that the versions
# in the package.json are not upgraded from what is present in the
# local package.json to a higher version in the container image.
COPY . /app/

# update the alpine image and install curl
RUN apk update && apk add curl

# installing Alpine Dependencies, but the context for the command from `yarn install` is explained above
RUN apk add --no-cache --virtual .build-deps1 g++ gcc libgcc libstdc++ linux-headers make python && \
    apk add --no-cache --virtual .npm-deps cairo-dev jpeg-dev libjpeg-turbo-dev pango pango-dev && \
    yarn install

RUN yarn run build

# STAGE 2: nginx
FROM nginx:1.16.0-alpine

# From ‘build’ stage copy the artifacts in dist/ to the default nginx public folder
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html

# setup nginx configurations
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx/default.conf /etc/nginx/conf.d/

# fire up nginx
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
