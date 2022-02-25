FROM fedora:latest

# Prepare web server & backend env.
RUN dnf update -y
RUN dnf module enable -y nodejs:12
RUN dnf install -y nginx python3 python3-pip nodejs procps
RUN pip3 install requests googletrans==3.1.0a0 dadata pyTelegramBotAPI

# Load frontend components ...
RUN rm /usr/share/nginx/html/*; \
    mkdir /usr/share/nginx/html/app-data; \
    mkdir /usr/share/nginx/html/app-data/news-storage; \
    mkdir /usr/share/nginx/html/app-data/news-storage/ca; \
    mkdir /usr/share/nginx/html/app-data/news-storage/cn; \
    mkdir /usr/share/nginx/html/app-data/news-storage/de; \
    mkdir /usr/share/nginx/html/app-data/news-storage/fr; \
    mkdir /usr/share/nginx/html/app-data/news-storage/gb; \
    mkdir /usr/share/nginx/html/app-data/news-storage/in; \
    mkdir /usr/share/nginx/html/app-data/news-storage/it; \
    mkdir /usr/share/nginx/html/app-data/news-storage/jp; \
    mkdir /usr/share/nginx/html/app-data/news-storage/ru; \
    mkdir /usr/share/nginx/html/app-data/news-storage/us
COPY ./src/assets /usr/share/nginx/html/assets
COPY ./src/templates /usr/share/nginx/html/templates
COPY ./src/index.html /usr/share/nginx/html
COPY ./src/style.css /usr/share/nginx/html
COPY ./src/index.js /usr/share/nginx/html
RUN mv /usr/share/nginx/html/templates/404.html /usr/share/nginx/html/404.html

# Load backend components...
RUN mkdir /backend
COPY ./src/backend/bash /backend
COPY ./src/backend/python /backend
COPY ./src/backend/js /backend
RUN chmod +x /backend/*.py; chmod +x /backend/*.sh

# Create log files
RUN touch /telegram_api.log; \
    echo '# News-AG @ Telegram API service log.' > /telegram_api.log; \
    touch /weather_forecast_api.log; \
    echo '# News-AG @ Weather & Forecast API cervice log.' > /weather_forecast_api.log; \
    touch /translate_api.log; \
    echo '# News-AG @ Translate API service log.' > /translate_api.log; \
    touch /cirrency_api.log; \
    echo '# News-AG @ Currency API service log.' > /currency_api.log; \
    touch /address_api.log; \
    echo '# News-AG @ Address API service log.' > /address_api.log; \
    touch /api_engine.log; \
    echo '# News-AG @ API engine service log.' > /api_engine.log; \
    touch /log_bot.log; \
    echo '# News-AG @ Log bot service log.' > /log_bot.log;

# Start project
CMD [ "/backend/start.sh" ]
