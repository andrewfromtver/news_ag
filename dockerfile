FROM centos:latest

RUN dnf install -y --nogpgcheck https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
RUN dnf install -y --nogpgcheck https://mirrors.rpmfusion.org/free/el/rpmfusion-free-release-8.noarch.rpm https://mirrors.rpmfusion.org/nonfree/el/rpmfusion-nonfree-release-8.noarch.rpm
RUN dnf install -y nginx python3 vim htop mc

RUN rm /usr/share/nginx/html/*

COPY ./app-data /usr/share/nginx/html/app-data
COPY ./assets /usr/share/nginx/html/assets
COPY ./templates /usr/share/nginx/html/templates
COPY ./index.html /usr/share/nginx/html
COPY ./index.js /usr/share/nginx/html
COPY ./style.css /usr/share/nginx/html

RUN mkdir /backend
COPY ./backend/python /backend
RUN chmod +x /backend/*
RUN pip3 install requests

# docker build -t news-ag:v1 .
# docker run -p 80:80 --rm -it news-ag:v1 
# nginx