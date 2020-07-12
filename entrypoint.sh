#!/bin/sh

sleep 10
echo " "
echo "<<<<<<<<<<<<<<<<<<<< Starting Application >>>>>>>>>>>>>>>>>>>>>>>>"
echo " "
#exec "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
yarn run start:dev
#exec nginx -c "$(pwd)/nginx.conf" -g "daemon off;"
#exec sudo setcap CAP_NET_BIND_SERVICE=+eip "$(pwd)/nginx.conf" -g "daemon off;"

exit 0
