# STAGE 1 as ‘build’
# base image
FROM node:8-alpine AS build

LABEL maintainer="Francis Masha" MAINTAINER="Francis Masha <francismasha96@gmail.com>"
LABEL application="almond-re"

# the working directory where the application would be started
WORKDIR /app

# The yarn.lock and package.json file is copied so that the versions
# in the package.json are not upgraded from what is present in the
# local package.json to a higher version in the container image.
COPY yarn.lock /app
COPY package.json /app

# update the alpine image and install curl
RUN apk update && apk add curl

# installing Alpine Dependencies, but the context for the command from `yarn install` is explained above
# from lines 17 > 39
RUN apk add --no-cache --virtual .build-deps1 g++ gcc libgcc libstdc++ linux-headers make python && \
    apk add --no-cache --virtual .npm-deps cairo-dev jpeg-dev libjpeg-turbo-dev pango pango-dev && \
    yarn install

COPY . /app

# Build the application final image with the base alpine image
FROM node:8-alpine

WORKDIR /app

# update the Alpine image and install curl
RUN apk update && apk add curl

# copy dependencies and the dist/ directory from the previous build stage.
COPY --from=build /app/node_modules ./node_modules/

# Copy all files from the root directory into the image
COPY . .

# Expose port 3000 for accessing  the app
EXPOSE 3000

# Run app when the container launches
CMD ["yarn", "start:dev"]

## STAGE 2:
#FROM nginx:1.15.8-alpine
#
#### setup nginx configurations
#COPY nginx/default.conf /etc/nginx/conf.d/
#
## From ‘build’ stage copy the artifacts in dist/ to the default nginx public folder
#RUN rm -rf /usr/share/nginx/html/*
#COPY --from=build /app/dist /usr/share/nginx/html
