import requests, json, app_config, urllib.request

token = app_config.news_api_key
lang_array = ['ru', 'gb', 'it', 'us']

def NewsFetch(lang):
	# news api (country and apiKey)
	query_params = {"country": lang,"apiKey": token}
	main_url = "https://newsapi.org/v2/top-headlines"
	# fetching data in json format
	res = requests.get(main_url, params=query_params)
	news_page = res.json()
	text_file = open('./app-data/news_'+lang+'.js', 'w')
	text_file.write('news_'+lang+' = ')
	text_file.close()
	with open('./app-data/news_'+lang+'.js', 'a', encoding='utf-8') as f:
		json.dump(news_page, f, ensure_ascii=False, indent=2)
    # getting all articles in a string article
	article = news_page["articles"]
	# empty list which will contain all trending news
	count = 1
	for ar in article:
		print(ar["title"])
		opener = urllib.request.build_opener()
		opener.addtimeout = 5
		opener.addheaders = [('User-agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36')]
		urllib.request.install_opener(opener)
		try:
			urllib.request.urlretrieve(ar["url"], './app-data/news-storage/'+lang+'/' + str(count) + '.html')
		except:
			text_file = open('./app-data/news-storage/'+lang+'/' + str(count) + '.html', 'w')
			text_file.write('<h3>Sorry, this content is not available in your region.</h3>')
			text_file.close()
		count += 1


# Driver Code
if __name__ == '__main__':
	# function call
	for lang in lang_array:
		NewsFetch(lang)
