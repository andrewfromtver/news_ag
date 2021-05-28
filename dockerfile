FROM centos:latest
# Prepare web server
RUN dnf install -y --nogpgcheck https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm https://mirrors.rpmfusion.org/free/el/rpmfusion-free-release-8.noarch.rpm https://mirrors.rpmfusion.org/nonfree/el/rpmfusion-nonfree-release-8.noarch.rpm
RUN dnf update -y
RUN dnf module enable -y nodejs:12
RUN dnf install -y nginx python3 vim htop mc nodejs
RUN pip3 install requests googletrans==3.1.0a0
# Load frontend components ...
RUN rm /usr/share/nginx/html/*
RUN mkdir /usr/share/nginx/html/app-data
RUN mkdir /usr/share/nginx/html/app-data/news-storage
RUN mkdir /usr/share/nginx/html/app-data/news-storage/ca
RUN mkdir /usr/share/nginx/html/app-data/news-storage/cn
RUN mkdir /usr/share/nginx/html/app-data/news-storage/de
RUN mkdir /usr/share/nginx/html/app-data/news-storage/fr
RUN mkdir /usr/share/nginx/html/app-data/news-storage/gb
RUN mkdir /usr/share/nginx/html/app-data/news-storage/in
RUN mkdir /usr/share/nginx/html/app-data/news-storage/it
RUN mkdir /usr/share/nginx/html/app-data/news-storage/jp
RUN mkdir /usr/share/nginx/html/app-data/news-storage/ru
RUN mkdir /usr/share/nginx/html/app-data/news-storage/us
COPY ./assets /usr/share/nginx/html/assets
COPY ./templates /usr/share/nginx/html/templates
COPY ./index.html /usr/share/nginx/html
COPY ./style.css /usr/share/nginx/html
COPY ./index.js /usr/share/nginx/html
# Load backend components...
RUN mkdir /backend
COPY ./backend/bash /backend
COPY ./backend/python /backend
COPY ./backend/js /backend
RUN chmod +x /backend/*
# Load statick data...
RUN python3 /backend/currency_api.py
RUN python3 /backend/news_api.py

# Test data - debug mode
# COPY ./docs/app-data/currency.js /usr/share/nginx/html/app-data
# COPY ./docs/app-data/news.js /usr/share/nginx/html/app-data
