#!/bin/bash 

set -ex
set -o pipefail

echo "Clean the images root dir"

cleanup() {
  echo "clean up begins"
  echo " "
  echo "begin Images removal"
  docker rmi -f $(docker images -a | awk {'print $3'})
}

main() {
  cleanup
}

main
