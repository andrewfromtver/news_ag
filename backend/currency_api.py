import requests
import json
import app_config

currency_api_key = app_config.currency_api_key

def CurrencyFetch():	
	# USD currency api (source and apiKey)
	query_params = {
	'access_key': currency_api_key
	}
	main_url = 'http://api.currencylayer.com/live'
	# fetching data in json format
	res = requests.get(main_url, params=query_params)
	currency_page = res.json()
	text_file = open('./app-data/currency_usd.js', 'w')
	text_file.write('currency = ')
	text_file.close()
	with open('./app-data/currency_usd.js', 'a', encoding='utf-8') as f:
		json.dump(currency_page, f, ensure_ascii=False, indent=2)
    # getting all articles in a string article
	article = currency_page['quotes']
	# empty list which will contain all trending news
	results = []
	for a in article:		
		# printing all trending news
		print(a)

# Driver Code
if __name__ == '__main__':
	# function call
	CurrencyFetch()
