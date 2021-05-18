import requests
import json
import app_config

token = app_config.owm_token
a = 56.8306
b = 35.942
c = 'json'
d = 'en'
e = 'metric'

def WeatherFetch(lat, lon, owm_mode, lang, units):	
	# weather api
	query_params = {
	'appid': token,
	'lat': lat,
	'lon': lon,
	'mpde':	owm_mode,
	'lang': lang,
	'units': units
	}
	main_url = 'http://api.openweathermap.org/data/2.5/weather'
	# fetching data in json format
	res = requests.get(main_url, params=query_params)
	weather_page = res.json()
	text_file = open('./app-data/weather.js', 'w')
	text_file.write('weather_json = ')
	text_file.close()
	with open('./app-data/weather.js', 'a', encoding='utf-8') as f:
		json.dump(weather_page, f, ensure_ascii=False, indent=2)
    # print result
	print(weather_page)

# Driver Code
if __name__ == '__main__':
	# function call (lat, lon, data_moode, lang, units)
	WeatherFetch(a, b, c, d, e)
