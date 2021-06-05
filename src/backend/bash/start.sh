#!/bin/bash

# load datasets
python3 /backend/currency_api.py
python3 /backend/news_api.py

# start update script
/backend/update.sh&

# start log_bot & webserver
python3 /backend/log_bot.py&
node /backend/serverside.js&
nginx

# check server status
ps fx | grep -E 'nod[e]|ngin[x]'

# container keep alive
tail -f /var/log/nginx/access.log
