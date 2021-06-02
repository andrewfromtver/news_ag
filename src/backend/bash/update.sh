#!/bin/bash

# update datasets each 4 hours
while true; do
  sleep 14400
  python3 /backend/currency_api.py
  python3 /backend/news_api.py
done
