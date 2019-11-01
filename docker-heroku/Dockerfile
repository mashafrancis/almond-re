FROM node:8-alpine AS build

LABEL maintainer="Francis Masha" MAINTAINER="Francis Masha <francismasha96@gmail.com>"

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
# COPY package.json /app
COPY yarn.lock /app
COPY package.json  /app

# installing Alpine Dependencies
# Install any needed packages specified in package.json
RUN apk add --no-cache --virtual .build-deps1 g++ gcc libgcc libstdc++ linux-headers make python && \
    apk add --no-cache --virtual .npm-deps cairo-dev jpeg-dev libjpeg-turbo-dev pango pango-dev && \
    yarn install

# Copy the root dir into the image
COPY . /app

# Run webpack build here in order to save
# time spent on building react bundle on GCP/GKE
RUN yarn build

# Build the application final image with the base alpine image
FROM node:8-alpine

WORKDIR /app

# update the Alpine image and install curl
RUN apk update && apk add curl

# copy dependencies and the dist/ directory from the previous build stage.
COPY --from=build /app/node_modules ./node_modules/
COPY --from=build /app/dist ./dist
COPY tsconfig.json /app
COPY package.json  server.js app.js  ./

# in order for Heroku to be able to bind it's auto-generated
# port number to the app we have to export the variable PORT
# in the docker environment so Heroku can do its thing.
# The PORT 3000 here is to enable the image to build because without
# value PORT would be empty during docker build and the process would fail
ENV PORT 3000
EXPOSE $PORT

# Run app when the container launches
CMD ["yarn", "start:heroku"]
