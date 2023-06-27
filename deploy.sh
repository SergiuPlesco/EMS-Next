#!/bin/bash

set -e 

CONTAINER_NAME=$1
CONTAINER_PORT=$2

if [ "$(docker ps -q --all -f name=${CONTAINER_NAME})" ]; then
    docker rm -f "${CONTAINER_NAME}"
fi

if [ -z "$CONTAINER_PORT" ]; then
    CONTAINER_PORT=9093
fi

echo "$DOCKER_TOKEN" | docker login -u administrator --password-stdin git.s4.smartdata.solutions

docker pull git.s4.smartdata.solutions/smartdata/${CONTAINER_NAME}
docker run -d --name "${CONTAINER_NAME}" -p ${CONTAINER_PORT}:3000 git.s4.smartdata.solutions/smartdata/${CONTAINER_NAME}