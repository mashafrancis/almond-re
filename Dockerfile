# STAGE 1: build
# base image
FROM node:14-alpine AS build

LABEL maintainer="Francis Masha" MAINTAINER="Francis Masha <francismasha96@gmail.com>"
LABEL application="almond-re"

ARG NODE_ENV=$NODE_ENV
ENV TERM=xterm-256color

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

# update the alpine image and install curl
RUN apk update && apk add curl

# installing Alpine Dependencies, but the context for the command from `yarn install` is explained above
RUN apk add --no-cache --virtual .build-deps1 g++ gcc libgcc libstdc++ linux-headers make python && \
    apk add --no-cache --virtual .npm-deps cairo-dev jpeg-dev libjpeg-turbo-dev pango pango-dev && \
    apk add bash

RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/main' >> /etc/apk/repositories
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/community' >> /etc/apk/repositories
RUN apk update

RUN npm config set unsafe-perm true
RUN npm install yarn@1.22.x
RUN rm -rf package-lock.json

COPY yarn.lock /home/node/app
COPY package.json /home/node/app

RUN yarn install
COPY --chown=node:node . .
RUN yarn build
#USER node

FROM node:14-alpine

# update the alpine image and install curl
RUN apk update && apk add curl

# copy dependencies and the dist/ directory from the previous build stage.
#COPY --from=build /home/node/app/node_modules ./nCOPY --from=build /home/node/app/node_modules ./node_modules/
#COPY --from=build /home/node/app/dist ./dist
COPY tsconfig.json /home/node/app
COPY package.json  server.js app.js  ./node_modules/
#COPY --from=build /home/node/app/dist ./dist
#COPY tsconfig.json /home/node/app
#COPY package.json  server.js app.js  ./

COPY --chown=node:node . .
USER node

# update the Alpine image and install curl
#RUN apk update && apk add curl

#USER node

## STAGE 2: nginx
#FROM nginx:1.17.6-alpine
#
#WORKDIR /app
#
## setup nginx configurations
## Remove (some of the) default nginx config
#RUN \
#  rm -rf /etc/nginx/conf.d/default.conf && \
#  rm -rf /etc/nginx/nginx.conf && \
#  rm -rf /etc/nginx/mime.types && \
#  rm -rf /etc/nginx/sites-*
#
#COPY nginx/mime.types /etc/nginx/
#COPY ./nginx.conf /etc/nginx/
#COPY nginx/*.conf /etc/nginx/conf.d/
#
## add permissions for nginx user
#RUN \
#  chown -R nginx:nginx /home/node/app && \
#  chmod -R 755 /home/node/app && \
#  chown -R nginx:nginx /var/cache/nginx && \
#  chown -R nginx:nginx /var/log/nginx && \
#  chown -R nginx:nginx /etc/nginx/conf.d
#
#RUN \
#  touch /var/run/nginx.pid && \
#  chown -R nginx:nginx /var/run/nginx.pid
#
## From ‘build’ stage copy the artifacts in dist/ to the default nginx public folder
#RUN rm -rf /usr/share/nginx/html/*
#COPY --from=build /home/node/app/dist /usr/share/nginx/html
#
#RUN apk add libcap
#
#RUN setcap 'cap_net_bind_service=+ep' /usr/sbin/nginx
#RUN setcap 'cap_net_bind_service=+ep' /etc/nginx/nginx.conf
#
## switch to non-root user
#USER nginx:nginx
#
## fire up nginx
#EXPOSE 80

ENV PORT 3000
EXPOSE $PORT

CMD ["yarn", "start:heroku"]

#RUN chmod 777 /home/node/app/entrypoint.sh

#ENTRYPOINT ["/home/node/app/entrypoint.sh"]

#CMD /bin/sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'

#CMD ["nginx","-g","daemon off;"]
