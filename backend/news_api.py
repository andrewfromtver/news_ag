import requests
import json
import app_config

a = app_config.news_api_key

def NewsFetch(token):	
	# RU news api (country and apiKey)
	query_params = {
	"country": "ru",
	"apiKey": token
	}
	main_url = "https://newsapi.org/v2/top-headlines"
	# fetching data in json format
	res = requests.get(main_url, params=query_params)
	news_page = res.json()
	text_file = open('./app-data/news_ru.js', 'w')
	text_file.write('news_ru = ')
	text_file.close()
	with open('./app-data/news_ru.js', 'a', encoding='utf-8') as f:
		json.dump(news_page, f, ensure_ascii=False, indent=2)
    # getting all articles in a string article
	article = news_page["articles"]
	# empty list which will contain all trending news
	results = []
	for ar in article:
		results.append(ar["title"])
	for i in range(len(results)):		
		# printing all trending news
		print(i + 1, results[i])
    
    # US news api (country and apiKey)
	query_params = {
	"country": "us",
	"apiKey": token
	}
	main_url = "https://newsapi.org/v2/top-headlines"
	# fetching data in json format
	res = requests.get(main_url, params=query_params)
	news_page = res.json()
	text_file = open('./app-data/news_us.js', 'w')
	text_file.write('news_us = ')
	text_file.close()
	with open('./app-data/news_us.js', 'a', encoding='utf-8') as f:
		json.dump(news_page, f, ensure_ascii=False, indent=2)
    # getting all articles in a string article
	article = news_page["articles"]
	# empty list which will contain all trending news
	results = []
	for ar in article:
		results.append(ar["title"])
	for i in range(len(results)):		
		# printing all trending news
		print(i + 1, results[i])

    # GB news api (country and apiKey)
	query_params = {
	"country": "gb",
	"apiKey": token
	}
	main_url = "https://newsapi.org/v2/top-headlines"
	# fetching data in json format
	res = requests.get(main_url, params=query_params)
	news_page = res.json()
	text_file = open('./app-data/news_gb.js', 'w')
	text_file.write('news_gb = ')
	text_file.close()
	with open('./app-data/news_gb.js', 'a', encoding='utf-8') as f:
		json.dump(news_page, f, ensure_ascii=False, indent=2)
    # getting all articles in a string article
	article = news_page["articles"]
	# empty list which will contain all trending news
	results = []
	for ar in article:
		results.append(ar["title"])
	for i in range(len(results)):		
		# printing all trending news
		print(i + 1, results[i])

    # IT news api (country and apiKey)
	query_params = {
	"country": "it",
	"apiKey": token
	}
	main_url = "https://newsapi.org/v2/top-headlines"
	# fetching data in json format
	res = requests.get(main_url, params=query_params)
	news_page = res.json()
	text_file = open('./app-data/news_it.js', 'w')
	text_file.write('news_it = ')
	text_file.close()
	with open('./app-data/news_it.js', 'a', encoding='utf-8') as f:
		json.dump(news_page, f, ensure_ascii=False, indent=2)
    # getting all articles in a string article
	article = news_page["articles"]
	# empty list which will contain all trending news
	results = []
	for ar in article:
		results.append(ar["title"])
	for i in range(len(results)):		
		# printing all trending news
		print(i + 1, results[i])
		
# Driver Code
if __name__ == '__main__':
	# function call
	NewsFetch(a)
