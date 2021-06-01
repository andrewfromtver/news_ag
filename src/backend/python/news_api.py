import requests, json, app_config, urllib.request, socket

socket.setdefaulttimeout(120)

token = app_config.news_api_key
lang_array = ['ca', 'cn', 'de', 'fr', 'gb', 'in', 'it', 'jp', 'ru', 'us']
news = ''

def NewsFetch(lang):
	# news api (country and apiKey)
	query_params = {"country": lang,"apiKey": token}
	main_url = "http://newsapi.org/v2/top-headlines"
	# fetching data in json format
	res = requests.get(main_url, params=query_params)
	news_page = res.json()
    # getting all articles
	global news
	if news_page["status"] == "ok":
		news += '\n news_'+lang+' = '+str(news_page)
		count = 1
		for ar in article:
			print(str(count) + ' -> ' + ar["title"])
			try:
				opener = urllib.request.build_opener()
				opener.addheaders = [('User-agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36')]
				urllib.request.install_opener(opener)
				urllib.request.urlretrieve(ar["url"], '/usr/share/nginx/html/app-data/news-storage/'+lang+'/' + str(count) + '.html')
			except:
				text_file = open('/usr/share/nginx/html/app-data/news-storage/'+lang+'/' + str(count) + '.html', 'w')
				text_file.write('<h3>Sorry, this content is not available in your region.</h3>')
				text_file.close()
			count += 1
	else:
		news += '\n news_'+lang+' = {"articles": {}}'

# Driver Code
if __name__ == '__main__':
	# function call
	for lang in lang_array:
		NewsFetch(lang)

	text_file = open('/usr/share/nginx/html/app-data/news.js', 'w')
	text_file.write('// News-AG html fetcher \n' + news)
	text_file.close()