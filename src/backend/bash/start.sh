#!/bin/bash

# load datasets
python3 /backend/currency_api.py
python3 /backend/news_api.py

# start update script
/backend/update.sh&

# start webserver
node /backend/serverside.js&
nginx

# logging
ps fx | grep -E 'nod[e]|ngin[x]'
tail -f /var/log/nginx/access.log
