# news_ag

1. Install docker

    sudo dnf install -y docker || sudo apt-get install -y docker

2. Build image

    docker build -t news_ag:v1 .

3. Run docker container

    docker run -p 80:80 --rm -it news_ag:v1

4. Start web server in docker container

    /backend/start.sh

5. Enjoy