# STAGE 1: build
# base image
FROM node:14-alpine AS build

LABEL maintainer="Francis Masha" MAINTAINER="Francis Masha <francismasha96@gmail.com>"
LABEL application="almond-re"

WORKDIR /opt/web

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

COPY yarn.lock ./
COPY package.json ./

RUN yarn install

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./

#COPY --chown=node:node . .
RUN yarn run build
#USER node

FROM nginx:1.17-alpine

RUN apk --no-cache add curl
RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin

# setup nginx configurations
# Remove (some of the) default nginx config
RUN \
#  rm -rf /etc/nginx/conf.d/default.conf && \
#  rm -rf /etc/nginx/nginx.conf && \
  rm -rf /etc/nginx/mime.types && \
  rm -rf /etc/nginx/sites-*

COPY nginx/mime.types /etc/nginx/
#COPY ./nginx.conf /etc/nginx/
COPY ./nginx.config /etc/nginx/nginx.template
COPY nginx/*.conf /etc/nginx/conf.d/

COPY --from=build /opt/web/dist /usr/share/nginx/html

RUN ls -la /usr/share/nginx/html

# Default port exposure
EXPOSE 80

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
#COPY .env .

# Make our shell script executable
RUN chmod +x env.sh

# Start Nginx server
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
#CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]

#FROM node:14-alpine
#
## update the alpine image and install curl
#RUN apk update && apk add curl
#
## copy dependencies and the dist/ directory from the previous build stage.
##COPY --from=build /home/node/app/node_modules ./nCOPY --from=build /home/node/app/node_modules ./node_modules/
##COPY --from=build /home/node/app/dist ./dist
#COPY tsconfig.json /home/node/app
#COPY package.json  server.js app.js  ./node_modules/
##COPY --from=build /home/node/app/dist ./dist
##COPY tsconfig.json /home/node/app
##COPY package.json  server.js app.js  ./
#
#COPY --chown=node:node . .
#USER node

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

#ENV PORT 3000
#EXPOSE $PORT
#
#CMD ["yarn", "start"]

#RUN chmod 777 /home/node/app/entrypoint.sh

#ENTRYPOINT ["/home/node/app/entrypoint.sh"]

#CMD /bin/sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'

#CMD ["nginx","-g","daemon off;"]
