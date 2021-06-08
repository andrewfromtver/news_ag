# News-AG

0. Create new file "app_config.py" in "./backend/python" directory 
and add variables (tokens to wep API's) like in example below

    news_api_key = ''
    currency_api_key = ''
    address_api_key = ''
    owm_token = ''
    telegram_bot_token = ''
    telegram_chat_id = ''

1. Install docker

    # fedora
    sudo dnf install -y docker
    # ubuntu
    sudo apt-get install -y docker

2. Build image

    docker build -t news-ag:v1 . > last_build.log 

3. Run docker container

    docker run --rm -it \
        -p 80:80 \
        -p 8000:8000 \
        -p 8100:8100 \
        -p 8200:8200 \
        -p 8300:8300 \
        -p 8400:8400 \
        -p 8500:8500  \
        news-ag:v1 >> server.log 2>&1 &

4. Enjoy

    open news_ag in web browser (http:/localhost)

Extra. You can replace localhost with your hostname in all src files with sed util

    sed -i 's/localhost/your-host.name/g' src/index.js
    sed -i 's/localhost/your-host.name/g' src/templates/js/*
