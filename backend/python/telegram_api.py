import requests
import json
import app_config
import sys

token = app_config.telegram_bot_token
chat_id = app_config.telegram_chat_id
a = str(sys.argv[1])
b = str(sys.argv[2])
c = str(sys.argv[3])

def ForecastFetch(name, email, msg):	
	# telegram api
	query_params = {
	'chat_id': chat_id,
	'text': 'name: ' + name + ' / email: ' + email + ' / message: ' + msg
	}
	main_url = 'http://api.telegram.org/bot' + token + '/sendMessage'
	# fetching data in json format
	res = requests.get(main_url, params=query_params)
	request_result = res.json()
    # print result
	print(request_result)

# Driver Code
if __name__ == '__main__':
	# function call (name, email, message)
	ForecastFetch(a, b, c)