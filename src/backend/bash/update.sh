#!/bin/bash

while true; do
  sleep 3600
  python3 /backend/currency_api.py
  python3 /backend/news_api.py
done