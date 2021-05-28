# news_ag

0. Create new file "app_config.py" in "./backend/python" directory 
and add variables (tokens to wep API's) like in example below

    news_api_key = ''
    currency_api_key = ''
    owm_token = ''
    telegram_bot_token = ''
    telegram_chat_id = ''

1. Install docker

    sudo dnf install -y docker || sudo apt-get install -y docker

2. Build image

    docker build -t news_ag:v1 .

3. Run docker container

    docker run -p 80:80 --rm -it news_ag:v1 /backend/start.sh

4. Enjoy

    open news_ag in web browser (http:/localhost)