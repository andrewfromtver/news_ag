import requests
import json
import app_config

owm_token = app_config.owm_token
lat = 56.8306
lon = 35.942
owm_mode = 'json'

def ForecastFetch():	
	# forecast api
	query_params = {
	'appid': owm_token,
	'lat': lat,
	'lon': lon,
	'mode':	owm_mode,
	'lang': 'en',
	'units': 'metric',
    'exclude': 'current,minutely,hourly,alerts'
	}
	main_url = 'https://api.openweathermap.org/data/2.5/onecall'
	# fetching data in json format
	res = requests.get(main_url, params=query_params)
	forecast_page = res.json()
	text_file = open('./app-data/forecast.js', 'w')
	text_file.write('forecast = ')
	text_file.close()
	with open('./app-data/forecast.js', 'a', encoding='utf-8') as f:
		json.dump(forecast_page, f, ensure_ascii=False, indent=2)
    # print result
	print(forecast_page)

# Driver Code
if __name__ == '__main__':
	# function call
	ForecastFetch()
