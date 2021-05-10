import requests
import json
import app_config

currency_api_key = app_config.currency_api_key

def CurrencyFetch():	
	# currency api (apiKey)
	query_params = {
	'access_key': currency_api_key
	}
	main_url = 'http://api.currencylayer.com/live'
	# fetching data in json format
	res = requests.get(main_url, params=query_params)
	currency_page = res.json()
	text_file = open('./app-data/currency.js', 'w')
	text_file.write('currency = ')
	text_file.close()
	with open('./app-data/currency.js', 'a', encoding='utf-8') as f:
		json.dump(currency_page, f, ensure_ascii=False, indent=2)
    # getting all currencys in a string currency
	article = currency_page['quotes']
	# empty list which will contain all currencys
	results = []
	for a in article:
		results.append(a)
	for i in range(len(results)):		
		# printing all currencys
		print(i + 1, results[i])

# Driver Code
if __name__ == '__main__':
	# function call
	CurrencyFetch()
