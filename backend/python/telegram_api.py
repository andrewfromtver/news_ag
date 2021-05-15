import requests
import json
import app_config

a = app_config.telegram_bot_token
b = app_config.telegra_chat_id
c = 'John Doe'
d = 'johndoe@company.com'
e = 'test message'

def ForecastFetch(token, chat_id, name, email, msg):	
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
	# function call
	ForecastFetch(a, b, c, d, e)