FROM nginx
COPY ./app-data /usr/share/nginx/html
COPY ./assets /usr/share/nginx/html
COPY ./templates /usr/share/nginx/html
COPY ./index.html /usr/share/nginx/html
COPY index.js /usr/share/nginx/html
COPY style.css /usr/share/nginx/html