# STAGE 1: build process
FROM node:14-alpine AS build

LABEL maintainer="Francis Masha" MAINTAINER="Francis Masha <francismasha96@gmail.com>"
LABEL application="almond-re"

#WORKDIR /opt/web
RUN apk update && apk add curl

# installing Alpine Dependencies, but the context for the command from `yarn install` is explained above
RUN apk add --no-cache --virtual .build-deps1 g++ gcc libgcc libstdc++ linux-headers make python && \
    apk add --no-cache --virtual .npm-deps cairo-dev jpeg-dev libjpeg-turbo-dev pango pango-dev && \
    apk add bash

RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/main' >> /etc/apk/repositories
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/community' >> /etc/apk/repositories
RUN apk update

RUN npm config set unsafe-perm true
RUN npm install -g yarn@1.22.5 --force
RUN rm -rf package-lock.json
COPY package.json ./

#RUN yarn set version berry
#RUN echo 'nodeLinker: node-modules' >> .yarnrc.yml
RUN yarn install
#ENV PATH="./node_modules/.bin:$PATH"
COPY . ./
RUN yarn run build

# Stage 2 - the production environment
FROM nginx:1.17-alpine
RUN apk --no-cache add curl
RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin

# setup nginx configurations
RUN \
  rm -rf /etc/nginx/mime.types && \
  rm -rf /etc/nginx/sites-*

COPY nginx/mime.types /etc/nginx/
COPY ./nginx.config /etc/nginx/nginx.template
COPY nginx/*.conf /etc/nginx/conf.d/
COPY --from=build /dist /usr/share/nginx/html
RUN ls -la /usr/share/nginx/html

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./env.sh .

# Make our shell script executable
RUN chmod +x env.sh

# ssl letsencrypt
COPY run.sh /run.sh
COPY certbot.sh /certbot.sh
COPY restart.sh /restart.sh
COPY croncert.sh /etc/periodic/weekly/croncert.sh
RUN \
	chmod +x /run.sh && \
	chmod +x /certbot.sh && \
	chmod +x /restart.sh && \
	chmod +x /etc/periodic/weekly/croncert.sh

# Start Nginx server
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
EXPOSE 80 443
