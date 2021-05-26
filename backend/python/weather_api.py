import requests
import json
import app_config
import sys

token = app_config.owm_token
a = str(sys.argv[1])
b = str(sys.argv[2])
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
    # print result
	print(str(weather_page).replace("'", '"'))

# Driver Code
if __name__ == '__main__':
	# function call (lat, lon, data_moode, lang, units)
	WeatherFetch(a, b, c, d, e)
