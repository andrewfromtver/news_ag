import requests
import json
import app_config
import sys

token = app_config.owm_token
a = str(sys.argv[2])
b = str(sys.argv[1])
c = 'json'
d = 'en'
e = 'metric'
f = 'current,minutely,alerts'

def ForecastFetch(lat, lon, owm_mode, lang, units, exclude):	
	# forecast api
	query_params = {
	'appid': token,
	'lat': lat,
	'lon': lon,
	'mode':	owm_mode,
	'lang': lang,
	'units': units,
    'exclude': exclude
	}
	main_url = 'http://api.openweathermap.org/data/2.5/onecall'
	# fetching data in json format
	res = requests.get(main_url, params=query_params)
	forecast_page = res.json()
	print(str(forecast_page).replace("'\"",'"').replace("'",'"'))

# Driver Code
if __name__ == '__main__':
	# function call
	ForecastFetch(a, b, c, d, e, f)
