#!/bin/bash

set -e

IMAGE_TAG="$1"

if [ -z "$IMAGE_TAG" ]; then
  echo "Docker image tag is not provided."
  exit 1
fi

docker build -t tooleks/shevchenko:latest -t tooleks/shevchenko:$IMAGE_TAG .
docker push tooleks/shevchenko:latest
docker push tooleks/shevchenko:$IMAGE_TAG