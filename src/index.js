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
  document.getElementById('newsframe').sandbox = 'allow-scripts allow-same-origin allow-forms allow-modals'
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
    document.getElementById('title').innerText = 'News AG - Movies & TV\'s serch'
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
  document.querySelector('.menubutton').id = 'false'
  document.querySelector('body').style.overflow = 'auto'
  document.getElementById('news').innerHTML = ``
  document.getElementById('popupplaceholder').style.display = 'none'
  document.getElementById('menu').style.display = 'none'
  if (typeof eval('news_' + lang).articles[0] !== 'undefined') {
    document.querySelector('.translate > button > img').src = '/assets/translate.png'
    document.querySelector('.translate > button').disabled = false
    eval('news_' + lang).articles.forEach(e => {
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
  else {
    document.querySelector('.translate > button > img').src = '/assets/waiting.gif'
    document.querySelector('.translate > button').disabled = true
    document.getElementById('news').innerHTML = `
      <img class="nodata" src="./assets/nodata.png" alt="nodata">
      <h3 id="nodata">Please try again later ...</h3>
    `
  }
}
// Get currency
loadCurrency = () => {
  fetch('http://localhost:8400')
    .then( (v) => {
      if(v.status !== 200){
        return Promise.reject(new Error('Error ' + v.status))
      }
      return v.json()
    })
    .then( (v) => {
      document.getElementById('usd')
        .innerText = String(v.USDRUB).substring(0, 5)
      document.getElementById('eur')
        .innerText = String(v.USDRUB / v.USDEUR).substring(0, 5)
    })
    .catch( (e) => {
      document.getElementById('usd').innerText = '--.--'
      document.getElementById('eur').innerText = '--.--'
      alert(e + ' please try again leter')
    })
}
// Open provided news page in frame
goTo = (url, title) => {
  sideMenu(true)
  document.querySelector('body').style.overflow = 'hidden'
  document.getElementById('popupplaceholder').style.display = ''
  document.getElementById('title').innerText = title
  corsClear(url)
}
// Close popup
closePopup = () => {
  document.getElementById('popupactions').innerHTML = `
      <a>
        <img src="./assets/close.png" alt="close" onclick="closePopup()">
      </a>
    `
  document.querySelector('body').style.overflow = 'auto'
  document.getElementById('popupplaceholder').style.display = 'none'
  document.getElementById('newsframe').src = './templates/loader.html'
}
// Refresh page
refresh = () => { window.location.reload() }
// CORS workaround
corsClear = (url) => {
  // get html via proxy
  let lang = document.getElementById('lang').value || 'gb'
  let news_index = eval('news_' + lang).articles.findIndex(x => x.url === url) + 1
  document.getElementById('newsframe').sandbox = 'allow-same-origin'
  document.getElementById('newsframe').src = './app-data/news-storage/' + lang + '/' + news_index + '.html'
  document.getElementById('popupactions').innerHTML = `
    <a href="${url}" target="blank">
      <img id="redirect" src="./assets/redirect.png">
    </a>
    <a>
      <img src="./assets/close.png" alt="close" onclick="closePopup()">
    </a>
  `
}
// Translation
translateSelceted = () => {
  let translateLang = document.getElementById('translate_lang').value || 'ru'
  let sel = (document.selection && document.selection.createRange().text) || (window.getSelection && window.getSelection().toString()) || (document.getElementById('newsframe').contentWindow.document.selection && document.getElementById('newsframe').contentWindow.document.selection.createRange().text) || (document.getElementById('newsframe').contentWindow.window.getSelection && document.getElementById('newsframe').contentWindow.window.getSelection().toString())
  document.querySelector('.translate > button > img').src = '/assets/waiting.gif'
  document.querySelector('.translate > button').disabled = true
  if (sel) {
    let loader = document.createElement('div')
    loader.id = 'translation'
    loader.innerHTML = `
      <div class='loader_placeholder'>
        <div class='lds-ellipsis loader'><div></div><div></div><div></div><div></div></div>
      </div>
    `
    document.body.appendChild(loader)
    fetch('http://localhost:8300' + '?query=' + sel + '&lang=' + translateLang)
      .then( (value) => {
        loader.remove()
        if(value.status !== 200){
          return Promise.reject(new Error('Error ' + value.status))
        }
        return value.text()
      })
      .then( (value) => {
        loader.remove()
        let response = value
        let translation = document.createElement('div')
        translation.id = 'translation'
        translation.innerHTML = `
          <div class="loader">
            <div class="loader__element"></div>
          </div>
          <p>${response}</p>
        `
        document.body.appendChild(translation)
        setTimeout(()=>{
          document.querySelector('.translate > button > img').src = '/assets/translate.png'
          document.querySelector('.translate > button').disabled = false
          translation.remove()
        }, 12000)
      })
      .catch( (e) => {
        document.querySelector('.translate > button > img').src = '/assets/translate.png'
        document.querySelector('.translate > button').disabled = false
        translation.remove()
        alert(e + ' please try again leter')
      })
  }
  else {
    let translation = document.createElement('div')
        translation.id = 'translation'
        translation.innerHTML = `
          <div class="loader">
            <div class="loader__element"></div>
          </div>
          <p>Please highlight the text in order to translate it</p>
        `
    document.body.appendChild(translation)
    setTimeout(()=>{
      document.querySelector('.translate > button > img').src = '/assets/translate.png'
      document.querySelector('.translate > button').disabled = false
      translation.remove()
    }, 12000)
  }
}
// Init
window.onload = () => {
  let url = window.location.href
  document.getElementById('facebook').href = 'https://facebook.com/sharer/sharer.php?u=' + url
  document.getElementById('vkontakte').href = 'https://vk.com/share.php?url=' + url
  document.getElementById('whatsapp').href = 'whatsapp://send?text=' + url
  document.getElementById('telegram').href = 'https://t.me/share/url?url=' + url
  loadNews(document.getElementById('lang').value)
  loadCurrency()
  // Remove init loader
  setTimeout(()=>{
    document.querySelector('.init').remove()
  }, 250)
}