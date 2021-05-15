import requests
import json
import app_config

token = app_config.telegram_bot_token
chat_id = app_config.telegra_chat_id
a = 'John Doe'
b = 'johndoe@company.com'
c = 'test message'

def ForecastFetch(name, email, msg):	
	# telegram api
	query_params = {
	'chat_id': chat_id,
	'text': 'name: ' + name + ' / email: ' + email + ' / message: ' + msg
	}
	main_url = 'https://api.telegram.org/bot' + token + '/sendMessage'
	# fetching data in json format
	res = requests.get(main_url, params=query_params)
	request_result = res.json()
    # print result
	print(request_result)

# Driver Code
if __name__ == '__main__':
	# function call (name, email, message)
	ForecastFetch(a, b, c)