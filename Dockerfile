# STAGE 1: build process
FROM node:14-alpine AS build

LABEL maintainer="Francis Masha" MAINTAINER="Francis Masha <francismasha96@gmail.com>"
LABEL application="almond-re"

ENV APP_HOME=/home/app

RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# Update the alpine image
RUN apk update && apk upgrade

# Installing alpine dependencies
RUN apk --no-cache add --update tcl apache2 ca-certificates \
    apk-tools curl build-base cups-client dcron bind-tools git gnupg nano wget && \
    apk add bash coreutils openssl ca-certificates && \
    rm -f /var/cache/apk/*

RUN npm config set unsafe-perm true
RUN npm install -g yarn@1.22.5 --force
RUN rm -rf package-lock.json

COPY yarn.lock $APP_HOME
COPY package.json $APP_HOME

RUN yarn install
ADD . $APP_HOME
RUN yarn run build

## Stage 2 - the production build
# Build a the application image with
FROM node:14-alpine
ENV APP_HOME=/home/app
WORKDIR $APP_HOME

# update the Alpine image and install curl
RUN apk update && apk add curl

# copy dependencies and the dist/ directory from the previous build stage.
COPY --from=build /home/app/node_modules ./node_modules/
COPY --from=build /home/app/dist ./dist
COPY tsconfig.json /home/app
COPY package.json  server.js app.js  ./

# Expose port 3000 for accessing  the app
EXPOSE 3000

# Run app when the container launches
CMD ["yarn", "start"]

## Stage 2 - the production environment
#FROM nginx:1.17-alpine
## Create the appropriate directories
#RUN mkdir /var/www && mkdir /var/www/html
#RUN mkdir /etc/letsencrypt
#RUN \
#  rm -rf /etc/nginx/mime.types && \
#  rm -rf /etc/nginx/sites-* && \
#  rm /etc/nginx/conf.d/default.conf && \
#  rm /usr/share/nginx/html/index.html
#
#COPY nginx/mime.types /etc/nginx/
#COPY nginx/nginx.conf /etc/nginx/conf.d
#COPY nginx/*.conf /etc/nginx/
#COPY --from=build /home/app/dist /usr/share/nginx/html
#
## Expose ports
#EXPOSE 80
#EXPOSE 443

## Make executable
#RUN chmod +x $APP_HOME/entrypoint.sh
#
#ENTRYPOINT $APP_HOME/entrypoint.sh
