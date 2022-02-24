#!/bin/bash

# build docker container
docker build -t news-ag:production . > ./build.log

# start production container & forward ports to host
docker run --rm -it \
	-p 8080:80 \
	-p 8000:8000 \
	-p 8100:8100 \
	-p 8200:8200 \
	-p 8300:8300 \
	-p 8400:8400 \
	-p 8500:8500 \
	news-ag:production
