import requests
import json
import app_config

owm_token = app_config.owm_token
lat = 56.8306
lon = 35.942
owm_mode = 'json'

def WeatherFetch():	
	# weather api
	query_params = {
	'appid': owm_token,
	'lat': lat,
	'lon': lon,
	'mpde':	owm_mode,
	'lang': 'en',
	'units': 'metric'
	}
	main_url = 'https://api.openweathermap.org/data/2.5/weather'
	# fetching data in json format
	res = requests.get(main_url, params=query_params)
	weather_page = res.json()
	text_file = open('./app-data/weather.js', 'w')
	text_file.write('weather = ')
	text_file.close()
	with open('./app-data/weather.js', 'a', encoding='utf-8') as f:
		json.dump(weather_page, f, ensure_ascii=False, indent=2)
    # print result
	print(weather_page)

# Driver Code
if __name__ == '__main__':
	# function call
	WeatherFetch()
