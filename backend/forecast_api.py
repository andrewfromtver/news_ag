import requests
import json
import app_config

a = app_config.owm_token
b = 56.8306
c = 35.942
d = 'json'
e = 'en'
f = 'metric'
g = 'current,minutely,hourly,alerts'

def ForecastFetch(token, lat, lon, owm_mode, lang, units, exclude):	
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
	ForecastFetch(a, b, c, d, e, f, g)
