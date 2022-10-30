#!/bin/bash
 
REPO_NAME=ts-business-manager-webapp

BACK_IMG_NAME=ts-business-manager-webapp-backend
BACK_IMG_PATH=registry.gitlab.com/jesusandres31/ts-business-manager-webapp/backend:latest

FRONT_IMG_NAME=ts-business-manager-webapp-frontend
FRONT_IMG_PATH=registry.gitlab.com/jesusandres31/ts-business-manager-webapp/frontend:latest

# start...

#
# back
#
cd ../server

# docker image prune -af
docker build -t="${BACK_IMG_NAME}" .

# get just created image ID
BACK_IMG_ID=$(docker images --format "{{.ID}} {{.Repository}}" | grep ${BACK_IMG_NAME} | awk '{ print $1 }')

docker tag ${BACK_IMG_ID} ${BACK_IMG_PATH}

docker push ${BACK_IMG_PATH}

#
# front
#
cd ../client

# docker image prune -af
docker build -t="${FRONT_IMG_NAME}" .

# get just created image ID
FRONT_IMG_ID=$(docker images --format "{{.ID}} {{.Repository}}" | grep ${FRONT_IMG_NAME} | awk '{ print $1 }')

docker tag ${FRONT_IMG_ID} ${FRONT_IMG_PATH}

docker push ${FRONT_IMG_PATH}

# end...