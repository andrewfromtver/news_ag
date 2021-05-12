// Side menu
sideMenu = (state) => {
  if(state === 'false') {
    document.querySelector('.menu').style.display = ''
    document.querySelector('.menubutton').id = 'true'
  }
  else {
    document.querySelector('.menu').style.display = 'none'
    document.querySelector('.menubutton').id = 'false'
  }
}
sideButton = (type) => {
  sideMenu(true)
  if (type === 'weather') {
    document.querySelector('body').style.overflow = 'hidden'
    document.getElementById('popupplaceholder').style.display = ''
    document.getElementById('newsframe').src = './templates/weather.html'
    document.getElementById('title').innerText = 'News AG - Weather'
  }
  else if (type === 'movies') {
    document.querySelector('body').style.overflow = 'hidden'
    document.getElementById('popupplaceholder').style.display = ''
    document.getElementById('newsframe').src = 'https://andrewfromtver.github.io/trailerpark-rebranding/'
    document.getElementById('title').innerText = 'News AG - TV\'s & Movies serch'
  }
  else if (type === 'about') {
    document.querySelector('body').style.overflow = 'hidden'
    document.getElementById('popupplaceholder').style.display = ''
    document.getElementById('newsframe').src = './templates/about.html'
    document.getElementById('title').innerText = 'News AG - About'
  }
}
// Generate news cards 
loadNews = (lang) => {
  document.querySelector('body').style.overflow = 'auto'
  document.getElementById('news').innerHTML = ``
  document.getElementById('popupplaceholder').style.display = 'none'
  document.getElementById('menu').style.display = 'none'
  if (lang === 'ru') {
    news_ru.articles.forEach(e => {
      document.getElementById('news').innerHTML += `
          <div class="card">
            <div id="${e.publishedAt}">
              <img src=${e.urlToImage || './assets/logo.png'}>
            </div>
            <h3>${e.title}</h3>
            <p>${e.description || ''}</p>
            <button id=${e.url} onclick="goTo(this.id, this.innerText)">
              ${e.source.name}
            </button>
          </div>
        `
    })
  }
  if (lang === 'us') {
    news_us.articles.forEach(e => {
      document.getElementById('news').innerHTML += `
          <div class="card">
            <div id="${e.publishedAt}">
              <img src=${e.urlToImage || './assets/logo.png'}>
            </div>
            <h3>${e.title}</h3>
            <p>${e.description || ''}</p>
            <button id=${e.url} onclick="goTo(this.id, this.innerText)">
              ${e.source.name}
            </button>
          </div>
        `
    })
  }
  if (lang === 'gb') {
    news_gb.articles.forEach(e => {
      document.getElementById('news').innerHTML += `
          <div class="card">
            <div id="${e.publishedAt}">
              <img src=${e.urlToImage || './assets/logo.png'}>
            </div>
            <h3>${e.title}</h3>
            <p>${e.description || ''}</p>
            <button id=${e.url} onclick="goTo(this.id, this.innerText)">
              ${e.source.name}
            </button>
          </div>
        `
    })
  }
  if (lang === 'it') {
    news_it.articles.forEach(e => {
      document.getElementById('news').innerHTML += `
          <div class="card">
            <div id="${e.publishedAt}">
              <img src=${e.urlToImage || './assets/logo.png'}>
            </div>
            <h3>${e.title}</h3>
            <p>${e.description || ''}</p>
            <button id=${e.url} onclick="goTo(this.id, this.innerText)">
              ${e.source.name}
            </button>
          </div>
        `
    })
  }
}
// Get currencys
loadCurrency = () => {
  document.getElementById('usd').innerText = String(currency.quotes.USDRUB).substring(0, 5)
  document.getElementById('eur').innerText = String(currency.quotes.USDRUB / currency.quotes.USDEUR).substring(0, 5)
}
// Open provided news page in frame
goTo = (url, title) => {
  sideMenu(true)
  document.querySelector('body').style.overflow = 'hidden'
  document.getElementById('popupplaceholder').style.display = ''
  document.getElementById('title').innerText = title
  corsCheck(url)
}
// Close popup
closePopup = () => {
  document.querySelector('body').style.overflow = 'auto'
  document.getElementById('popupplaceholder').style.display = 'none'
  document.getElementById('newsframe').src = './templates/loader.html'
}
// Refresh page
refresh = () => {
  window.location.reload()
}
// CORS detection
corsCheck = (url) => {
    document.getElementById('newsframe').src = url
    
}
// Init
window.onload = () => {
  loadNews(document.getElementById('lang').value)
  loadCurrency()
}