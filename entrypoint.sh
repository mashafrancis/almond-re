#!/bin/sh

sleep 10
echo " "
echo "<<<<<<<<<<<<<<<<<<<< Starting Application >>>>>>>>>>>>>>>>>>>>>>>>"
echo " "
yarn run start

exec "$@"
